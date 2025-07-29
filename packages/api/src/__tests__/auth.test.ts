import request from 'supertest';
import { appTest as app } from '../app'; // Importamos la app de Express para los tests
import { prisma } from '../prisma/client';

// Limpia la base de datos antes de cada test para asegurar un estado limpio
beforeEach(async () => {
  await prisma.user.deleteMany({});
});

// describe() agrupa tests relacionados
describe('Auth Endpoints', () => {

  // test() o it() define un caso de prueba individual
  it('Should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Aserciones: comprobamos que la respuesta es la esperada
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
    expect(response.body).not.toHaveProperty('password_hash');
  });

  it('Should not register a user with an existing email', async () => {
    // Primero, creamos un usuario
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    
    // Luego, intentamos registrarlo de nuevo
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
      
    expect(response.statusCode).toBe(409); // 409 Conflict
  });
  
  it('Should log in a registered user and return a JWT token', async () => {
    // Arrange: registrar al usuario
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@example.com', password: 'password123' });

    // Act: hacer login
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });
      
    // Assert: comprobar la respuesta
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('Should not log in with incorrect credentials', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@example.com', password: 'password123' });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'wrongpassword' });

    expect(response.statusCode).toBe(401);
  });
});
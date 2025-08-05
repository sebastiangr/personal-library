import request from 'supertest';
import { appTest as app } from '../app';
import { prisma } from '../prisma/client';

const agent = request.agent(app);
let userId: string;

// --- SETUP & TEARDOWN ---
// 1. Before all tests, create a user and get its token
beforeAll(async () => {
  // Clean the database before tests
  await prisma.loan.deleteMany({});      // Los préstamos dependen de Libros y Usuarios
  await prisma.book.deleteMany({});      // Los libros dependen de Autores, Géneros, Publishers y Usuarios
  await prisma.author.deleteMany({});    // Entidades principales
  await prisma.genre.deleteMany({});
  await prisma.publisher.deleteMany({});
  await prisma.user.deleteMany({});


  // Create a user and get its token
  const userResponse = await agent
    .post('/api/auth/register')
    .send({ email: 'book-test-user@example.com', password: 'password123' });
  userId = userResponse.body.id;

  // Log in to get the token
  const loginResponse = await agent
    .post('/api/auth/login')
    .send({ email: 'book-test-user@example.com', password: 'password123' });
  expect(loginResponse.statusCode).toBe(200);
});

// 2. Before each test, clean the books table to avoid interference
beforeEach(async () => {
  await prisma.loan.deleteMany({});      // Los préstamos dependen de Libros y Usuarios
  await prisma.book.deleteMany({});      // Los libros dependen de Autores, Géneros, Publishers y Usuarios
  await prisma.author.deleteMany({});    // Entidades principales
  await prisma.genre.deleteMany({});
  await prisma.publisher.deleteMany({});
  await prisma.user.deleteMany({}); 
});

// 3. After all tests, clean the user
afterAll(async () => {
  // await prisma.user.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.$disconnect();
});

// --- TEST SUITE for Authors ---
describe('Author Endpoints', () => {

  it('Should not allow access without a token', async () => {
    const response = await request(app).get('/api/authors');
    expect(response.statusCode).toBe(401); // Unauthorized
  });
   
  it('Should create a new author successfully', async () => {
    const response = await agent
      .post('/api/authors')
      .send({
        name: 'J.R.R. Tolkien',
        bio: 'Author of The Hobbit and The Lord of the Rings',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('J.R.R. Tolkien');
    expect(response.body.bio).toBe('Author of The Hobbit and The Lord of the Rings');
  });

  it('Should fetch all authors for the authenticated user', async () => {
    await agent
      .post('/api/authors')
      .send({ name: 'George Orwell', bio: 'Author of 1984 and Animal Farm' });

    const response = await agent
      .get('/api/authors');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe('George Orwell');
  });

  it('Should fetch a single author by ID', async () => {
    const createResponse = await agent
      .post('/api/authors')
      .send({ name: 'Isaac Asimov', bio: 'Author of Foundation series' });
    
    const authorId = createResponse.body.id;

    const response = await agent
      .get(`/api/authors/${authorId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Isaac Asimov');
  });

  it('Should return 404 if fetching an author that does not exist', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await agent
      .get(`/api/authors/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });1

  it('Should update an author successfully', async () => {
    const createResponse = await agent
      .post('/api/authors')
      .send({ name: 'Arthur C. Clarke', bio: 'Author of 2001: A Space Odyssey' });
    
    const authorId = createResponse.body.id;

    const response = await agent
      .put(`/api/authors/${authorId}`)
      .send({ name: 'Arthur C. Clarke', bio: 'Updated bio' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Arthur C. Clarke');
    expect(response.body.bio).toBe('Updated bio');
  });

  it('Should delete an author successfully', async () => {
    const createResponse = await agent
      .post('/api/authors')
      .send({ name: 'George Orwell', bio: 'Author of 1986' });

    const authorId = createResponse.body.id;
    const authorName = createResponse.body.name;

    const deleteResponse = await agent
      .delete(`/api/authors/${authorId}`);

    expect(deleteResponse.statusCode).toBe(200);      
    expect(deleteResponse.body).toHaveProperty('message', `Author ${authorName} deleted successfully.`);
  });

});
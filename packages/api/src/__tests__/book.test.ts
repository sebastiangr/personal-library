import request from 'supertest';
import { appTest as app } from '../app'; // Importamos la app de Express para los tests
import { prisma } from '../prisma/client';

let token: string;
let userId: string;

// --- SETUP & TEARDOWN ---
// 1. Before all tests, create a user and get its token
beforeAll(async () => {
  // Clean the database before tests
  await prisma.user.deleteMany({});
  
  // Create a user and get its token
  const userResponse = await request(app)
    .post('/api/auth/register')
    .send({ email: 'book-test-user@example.com', password: 'password123' });
  userId = userResponse.body.id;

  // Log in to get the token
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ email: 'book-test-user@example.com', password: 'password123' });
  token = loginResponse.body.token;
  console.log('Token obtenido:', token);
});

// 2. Before each test, clean the books table to avoid interference
beforeEach(async () => {
  await prisma.book.deleteMany({});
});

// 3. After all tests, clean the user
afterAll(async () => {
  await prisma.user.deleteMany({});
});


// --- SUITE DE TESTS PARA LIBROS ---
describe('Book Endpoints', () => {

  it('Should not allow access without a token', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(401); // Unauthorized
  });

  it('Should create a new book successfully', async () => {
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`) // <-- Autenticación
      .send({
        title: 'The Hobbit',
        published_year: 1937,
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('The Hobbit');
    expect(response.body.ownerId).toBe(userId);
  });

  it('Should fail to create a book without a title (validation)', async () => {
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ published_year: 1937 }); // Sin título
      
    expect(response.statusCode).toBe(400); // Bad Request por Zod
  });

  it('Should fetch all books for the authenticated user', async () => {
    // Arrange: Crea un libro primero
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Book 1' });
    
    // Act: Pide la lista de libros
    const response = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
      
    // Assert
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Book 1');
  });

  it('Should fetch a single book by its ID', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Fetch Me' });
    const bookId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Fetch Me');
  });
  
  it('Should return 404 if fetching a book that does not exist', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app)
      .get(`/api/books/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.statusCode).toBe(404);
  });

  it('Should update a book successfully', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'To Be Updated' });
    const bookId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });
  
  it('Should delete a book successfully', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'To Be Deleted' });
    const bookId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(deleteResponse.statusCode).toBe(204);

    // Opcional: Verificar que el libro ya no está en la DB
    const findResponse = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(findResponse.statusCode).toBe(404);
  });

});
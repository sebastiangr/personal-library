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
  await prisma.genre.deleteMany({});
});

// 3. After all tests, clean the user
afterAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

// --- TEST SUITE for Genres ---
describe('Genre Endpoints', () => {

  it('Should not allow access without a token', async () => {
    const response = await request(app).get('/api/authors');
    expect(response.statusCode).toBe(401); // Unauthorized
  });

  it('Should create a new genre successfully', async () => {
    const response = await agent
      .post('/api/genres')
      .send({
        name: 'Fantasy',
        description: 'A genre of speculative fiction set in a fictional universe.',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Fantasy');
    expect(response.body.description).toBe('A genre of speculative fiction set in a fictional universe.');
  });

  it('Should fetch all genres for the authenticated user', async () => {
    await agent
      .post('/api/genres')
      .send({
        name: 'Science Fiction',
        description: 'A genre that deals with imaginative and futuristic concepts.',
      });

    const response = await agent
      .get('/api/genres');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe('Science Fiction');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Should fetch a genre by ID', async () => {
    const createResponse = await agent
      .post('/api/genres')
      .send({
        name: 'Mystery',
        description: 'A genre that involves solving a crime or uncovering secrets.',
      });

    const genreId = createResponse.body.id;

    const response = await agent
      .get(`/api/genres/${genreId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', genreId);
    expect(response.body.name).toBe('Mystery');
  });

  it('Should return 404 if fetching a genre that does not exist', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await agent
      .get(`/api/genres/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });

  it('Should update a genre successfully', async () => {
    const createResponse = await agent
      .post('/api/genres')
      .send({
        name: 'Horror',
        description: 'A genre intended to frighten, scare, or disgust.',
      });

    const genreId = createResponse.body.id;

    const response = await agent
      .put(`/api/genres/${genreId}`)
      .send({
        name: 'Psychological Horror',
        description: 'A subgenre that focuses on the psychological states of characters.',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Psychological Horror');
    expect(response.body.description).toBe('A subgenre that focuses on the psychological states of characters.');
  });

  it('Should delete a genre successfully', async () => {
    const createResponse = await agent
      .post('/api/genres')
      .send({ 
        name: 'Romance', 
        description: 'A genre focused on romantic relationships.' 
      });

    const genreId = createResponse.body.id;

    const deleteResponse = await agent
      .delete(`/api/genres/${genreId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', `Genre with ID ${genreId} deleted successfully.`);
  });

});

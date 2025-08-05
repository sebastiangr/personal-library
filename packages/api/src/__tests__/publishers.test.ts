import  request from 'supertest';
import { appTest as app } from '../app';
import { prisma } from '../prisma/client';

const agent = request.agent(app);
let token: string;
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

// 2. Before each test, clean the authors table to avoid interference
beforeEach(async () => {
  await prisma.publisher.deleteMany({});
});

// 3. After all tests, clean the user
afterAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

// --- TEST SUITE for Publishers ---
describe('Publisher Endpoints', () => {

  it('Should not allow access without a token', async () => {
    const response = await request(app).get('/api/publishers');
    expect(response.statusCode).toBe(401); // Unauthorized
  });

  it('Should create a new publisher successfully', async () => {
    const response = await agent
      .post('/api/publishers')
      .send({
        name: 'Penguin Random House',
        country: 'USA',
        city: 'New York',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Penguin Random House');
    expect(response.body.country).toBe('USA');
    expect(response.body.city).toBe('New York');
  });

  it('Should fetch all publishers for the authenticated user', async () => {
    await agent
      .post('/api/publishers')
      .send({
        name: 'Penguin Random House',
        country: 'USA',
        city: 'New York',
      });

    const response = await agent
      .get('/api/publishers');      

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe('Penguin Random House');
    expect(response.body[0].country).toBe('USA');
    expect(response.body[0].city).toBe('New York');          
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Should fetch a publisher by ID', async () => {
    const createResponse = await agent
      .post('/api/publishers')
      .send({
        name: 'HarperCollins',
        country: 'USA',
        city: 'New York',
      });

    const publisherId = createResponse.body.id;

    const response = await agent
      .get(`/api/publishers/${publisherId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', publisherId);
    expect(response.body.name).toBe('HarperCollins');
  });

  it('Should return 404 if fetching a publisher that does not exist', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await agent
      .get(`/api/publishers/${nonExistentId}`);

    expect(response.statusCode).toBe(404);
  });

  it('Should update a publisher successfully', async () => {
    const createResponse = await agent
      .post('/api/publishers')
      .send({
        name: 'Macmillan',
        country: 'USA',
        city: 'New York',
      });

    const publisherId = createResponse.body.id;

    const response = await agent
      .put(`/api/publishers/${publisherId}`)
      .send({ name: 'Macmillan Updated' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Macmillan Updated');
  });

  it('Should delete a publisher successfully', async () => {
    const createResponse = await agent
      .post('/api/publishers')
      .send({
        name: 'Simon & Schuster',
        country: 'USA',
        city: 'New York',
      });

    const publisherId = createResponse.body.id;

    const deleteResponse = await agent
      .delete(`/api/publishers/${publisherId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', `Publisher ${createResponse.body.name} deleted successfully.`);
  });

});
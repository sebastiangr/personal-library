import request from 'supertest';
import { appTest as app } from '../app';
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
});

// 2. Before each test, clean the books table to avoid interference
beforeEach(async () => {
  await prisma.author.deleteMany({});
});

// 3. After all tests, clean the user
afterAll(async () => {
  await prisma.user.deleteMany({});
});

// --- TEST SUITE for Authors ---
describe('Author Endpoints', () => {

  it('Should not allow access without a token', async () => {
    const response = await request(app).get('/api/authors');
    expect(response.statusCode).toBe(401); // Unauthorized
  });
   
  it('Should create a new author successfully', async () => {
    const response = await request(app)
      .post('/api/authors')
      .set('Authorization', `Bearer ${token}`)
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
    await request(app)
      .post('/api/authors')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'George Orwell', bio: 'Author of 1984 and Animal Farm' });

    const response = await request(app)
      .get('/api/authors')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe('George Orwell');
  });

  it('Should fetch a single author by ID', async () => {
    const createResponse = await request(app)
      .post('/api/authors')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Isaac Asimov', bio: 'Author of Foundation series' });
    
    const authorId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/authors/${authorId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Isaac Asimov');
  });

  it('Should return 404 if fetching an author that does not exist', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app)
      .get(`/api/authors/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });1

  it('Should update an author successfully', async () => {
    const createResponse = await request(app)
      .post('/api/authors')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Arthur C. Clarke', bio: 'Author of 2001: A Space Odyssey' });
    
    const authorId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/authors/${authorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Arthur C. Clarke', bio: 'Updated bio' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Arthur C. Clarke');
    expect(response.body.bio).toBe('Updated bio');
  });

  it('Should delete an author successfully', async () => {
    const createResponse = await request(app)
      .post('/api/authors')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'George Orwell', bio: 'Author of 1986' });

    const authorId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/authors/${authorId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.statusCode).toBe(200);

    // const fetchResponse = await request(app)
    //   .get(`/api/authors/${authorId}`)
    //   .set('Authorization', `Bearer ${token}`);
    // expect(fetchResponse.statusCode).toBe(404);          
  });

  // it('Should delete an author successfully', async () => {
  //   const createResponse = await request(app)
  //     .post('/api/authors')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ name: 'Ray Bradbury', bio: 'Author of Fahrenheit 451' });
    
  //   const authorId = createResponse.body.id;

  //   const deleteResponse = await request(app)
  //     .delete(`/api/authors/${authorId}`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(deleteResponse.statusCode).toBe(204); // No Content
  // });
});
import request from 'supertest';
import { appTest as app } from '../app';
import { prisma } from '../prisma/client';

let ownerToken: string, borrowerToken: string;
let ownerId: string, borrowerId: string;
let bookId: string;

// --- SETUP & TEARDOWN ---
// 1. Before all tests, create users and get their tokens
beforeAll(async () => {
  // Clean the database before tests
  await prisma.loan.deleteMany({});      // Los préstamos dependen de Libros y Usuarios
  await prisma.book.deleteMany({});      // Los libros dependen de Autores, Géneros, Publishers y Usuarios
  await prisma.author.deleteMany({});    // Entidades principales
  await prisma.genre.deleteMany({});
  await prisma.publisher.deleteMany({});
  await prisma.user.deleteMany({});   

  // Create owner user and get its token
  const owner = await request(app).post('/api/auth/register').send({ email: 'owner@test.com', password: 'password123' });
  ownerId = owner.body.id;
  // console.log('Owner ID:', ownerId);
  const ownerLogin = await request(app).post('/api/auth/login').send({ email: 'owner@test.com', password: 'password123' });
  ownerToken = ownerLogin.body.token;
  // console.log('Owner Token:', ownerToken);

  // Create borrower user and get its token
  const borrower = await request(app).post('/api/auth/register').send({ email: 'borrower@test.com', password: 'password123' });
  borrowerId = borrower.body.id;
  // console.log('Borrower ID:', borrowerId);
  const borrowerLogin = await request(app).post('/api/auth/login').send({ email: 'borrower@test.com', password: 'password123' });
  borrowerToken = borrowerLogin.body.token;
  // console.log('Owner Token:', borrowerToken);

  const bookCreate = await request(app)
    .post('/api/books')
    .set('Authorization', `Bearer ${ownerToken}`) // <-- Autenticación
    .send({
      title: 'The Hobbit',
      published_year: 1937,
    });
  bookId = bookCreate.body.id;  
  // console.log('Book ID:', bookId);
});

// 2. Before each test, clean the loans table to avoid interference
beforeEach(async () => {
  await prisma.loan.deleteMany({});

  // Reset the book status to AVAILABLE before each test
  await prisma.book.update({ 
    where: { id: bookId }, 
    data: { status: 'AVAILABLE' } });
});

// 3. After all tests, clean the users
afterAll(async () => {
  // await prisma.user.deleteMany({});
  await prisma.$disconnect();
});

// --- TEST SUITE for Loans ---
describe('Loan Endpoints', () => {

  it('Should allow the owner to loan a book to a borrower', async () => {
    const response = await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`) // <-- Petición hecha por el dueño
      .send({ borrowerId: borrowerId });

    expect(response.statusCode).toBe(200);
    expect(response.body.loan.borrowerId).toBe(borrowerId);
    expect(response.body.book.status).toBe('LOANED');
  });

  it('Should allow the owner to mark a loaned book as returned', async () => {
    // Act: First, loan the book
    await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });
      
    // Now, return the book
    const response = await request(app)
      .post(`/api/books/${bookId}/return`)
      .set('Authorization', `Bearer ${ownerToken}`); // <-- Petición hecha por el dueño
    
    expect(response.statusCode).toBe(200);
    expect(response.body.loan).toHaveProperty('actualReturnDate');
    expect(response.body.book.status).toBe('AVAILABLE');
  });

  it('Should not allow the borrower to return a book', async () => {
    // Act: First, loan the book
    await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });

    // Now, try to return the book as the borrower
    const response = await request(app)
      .post(`/api/books/${bookId}/return`)
      .set('Authorization', `Bearer ${borrowerToken}`); // <-- Petición hecha por el prestatario

    expect(response.statusCode).toBe(400);
  });

  it('Should not allow the owner to loan a book that is already loaned', async () => {
    // Act: First, loan the book
    await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });

    // Now, try to loan the same book again
    const response = await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });

    expect(response.statusCode).toBe(400);
  });

  it('Should not allow the owner to return a book that is not loaned', async () => {
    const response = await request(app)
      .post(`/api/books/${bookId}/return`)
      .set('Authorization', `Bearer ${ownerToken}`); // <-- Petición hecha por el dueño

    expect(response.statusCode).toBe(400);
  });

  it('Should allow the borrower to view their loans', async () => {
    // Act: First, loan the book
    await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });

    // Now, fetch the borrower's loans
    const response = await request(app)
      .get('/api/loans/borrowed')
      .set('Authorization', `Bearer ${borrowerToken}`); // <-- Petición hecha por el prestatario

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].bookId).toBe(bookId);
    expect(response.body[0].borrowerId).toBe(borrowerId);
  });

  it('Should allow the owner to view all loans', async () => {
    // Act: First, loan the book
    await request(app)
      .post(`/api/books/${bookId}/loan`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ borrowerId: borrowerId });

    // Now, fetch all loans
    const response = await request(app)
      .get('/api/loans/lent')
      .set('Authorization', `Bearer ${ownerToken}`); // <-- Petición hecha por el dueño 

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].bookId).toBe(bookId);
    expect(response.body[0].borrowerId).toBe(borrowerId);
  });

  // TODO: Add more tests
});

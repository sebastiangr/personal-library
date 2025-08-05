import { prisma } from '../prisma/client';

// Service to handle book loans
export const loanBook = async (bookId: string, ownerId: string, borrowerId: string, expectedReturnDate?: Date) => {

  return prisma.$transaction(async (tx) => {

    // Check if the book exists and is available for loan
    const book = await tx.book.findFirst({
      where: {
        id: bookId,
        ownerId: ownerId,
        status: 'AVAILABLE',
      },
    });

    // If the book is not found or not available, throw an error
    if (!book) {
      // throw new Error('Libro no encontrado o no disponible para préstamo.');  
    }

    // Create the loan record
    const newLoan = await tx.loan.create({
      data: {
        bookId: bookId,
        ownerId: ownerId,
        borrowerId: borrowerId,
        expectedReturnDate: expectedReturnDate,
        actualReturnDate: null,
      },
    });

    // Update the book status to 'LOANED'
    const updatedBook = await tx.book.update({
      where: { id: bookId },
      data: { status: 'LOANED' },
    });

    return { loan: newLoan, book: updatedBook };
  });
}

// Return a book that was loaned
export const returnBook = async (bookId: string, ownerId: string) => {

  return prisma.$transaction(async (tx) => {
    
    // Check if there is an active loan for the book
    const activeLoan = await tx.loan.findFirst({
      where: {
        bookId: bookId,
        ownerId: ownerId,
        actualReturnDate: null, // Only consider loans that have not been returned
      },
    });

    if (!activeLoan) {
      throw new Error('No hay un préstamo activo para este libro.');
    }

    // Update the loan record to set the actual return date
    const updatedLoan = await tx.loan.update({
      where: { id: activeLoan.id },
      data: { actualReturnDate: new Date() },
    });

    // Update the book status to 'AVAILABLE'
    const updatedBook = await tx.book.update({
      where: { id: bookId },
      data: { status: 'AVAILABLE' },
    });

    return { loan: updatedLoan, book: updatedBook };
  });
}

// Get all books lent to a user
export const getLentBooks = async (userId: string) => {
  return prisma.loan.findMany({
    where: {
      ownerId: userId,
      actualReturnDate: null, // Only get lent books that have not been returned
    },
    include: {
      book: true,
      borrower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      loanDate: 'desc',
    },
  });
}

// Get all books borrowed by a user
export const getBorrowedBooks = async (userId: string) => {
  return prisma.loan.findMany({
    where: {
      borrowerId: userId,
      actualReturnDate: null, // Only get borrowed books that have not been returned
    },
    include: {
      book: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      loanDate: 'desc',
    },
  });
}

export const getLentBooksHistory = async (userId: string) => {
  return prisma.loan.findMany({
    where: {
      ownerId: userId,
      actualReturnDate: {
        not: null, // Only get loans that have been returned
      },
    },
    include: {
      book: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      loanDate: 'desc',
    },
  });
}
/*
  Warnings:

  - You are about to drop the column `excpectedReturnDate` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "excpectedReturnDate",
ADD COLUMN     "expectedReturnDate" TIMESTAMP(3);

-- CreateEnum
CREATE TYPE "BookFormat" AS ENUM ('PHYSICAL', 'DIGITAL');

-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('BOOK', 'MAGAZINE', 'COMIC', 'ARTICLE', 'JOURNAL', 'OTHER');

-- CreateEnum
CREATE TYPE "ReadStatus" AS ENUM ('UNREAD', 'READING', 'READ', 'DROPPED');

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birth_city" TEXT,
ADD COLUMN     "birth_country" TEXT,
ADD COLUMN     "birth_date" DATE,
ADD COLUMN     "death_date" DATE,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "photo_url" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "edition" TEXT,
ADD COLUMN     "format" "BookFormat" NOT NULL DEFAULT 'PHYSICAL',
ADD COLUMN     "language" TEXT,
ADD COLUMN     "personal_notes" TEXT,
ADD COLUMN     "rating" SMALLINT,
ADD COLUMN     "read_status" "ReadStatus" NOT NULL DEFAULT 'UNREAD',
ADD COLUMN     "small_thumbnail_url" TEXT,
ADD COLUMN     "type" "BookType" NOT NULL DEFAULT 'BOOK';

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "Author"("name");

-- CreateIndex
CREATE INDEX "Genre_name_idx" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "Publisher_name_idx" ON "Publisher"("name");

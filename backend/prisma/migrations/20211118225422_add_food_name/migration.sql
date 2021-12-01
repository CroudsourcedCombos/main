/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "creationDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "creationDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "editDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "editDate" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "Post";

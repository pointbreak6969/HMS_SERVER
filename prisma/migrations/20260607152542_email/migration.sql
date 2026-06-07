/*
  Warnings:

  - Added the required column `age` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `dateOfBirth` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT,
ALTER COLUMN "dateOfBirth" SET NOT NULL;

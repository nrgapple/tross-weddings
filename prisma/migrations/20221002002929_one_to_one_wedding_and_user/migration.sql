/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Wedding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Wedding_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_userId_key" ON "Wedding"("userId");

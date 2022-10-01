/*
  Warnings:

  - Added the required column `userId` to the `Wedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

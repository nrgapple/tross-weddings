-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_weddingId_fkey";

-- AlterTable
ALTER TABLE "Invitee" ADD COLUMN     "weddingId" TEXT;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Invitee" ADD CONSTRAINT "Invitee_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

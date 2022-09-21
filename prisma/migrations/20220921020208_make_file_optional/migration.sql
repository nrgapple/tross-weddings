-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_fileId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "fileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

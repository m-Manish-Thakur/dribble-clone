-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

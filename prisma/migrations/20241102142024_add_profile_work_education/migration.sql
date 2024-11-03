-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "behance" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "figma" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "medium" TEXT;

-- CreateTable
CREATE TABLE "WorkHistory" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startYear" TEXT NOT NULL,
    "endYear" TEXT NOT NULL,

    CONSTRAINT "WorkHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "degree" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkHistory" ADD CONSTRAINT "WorkHistory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

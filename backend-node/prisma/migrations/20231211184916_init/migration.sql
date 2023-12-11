/*
  Warnings:

  - You are about to drop the `AuthenticationRequirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_uid_fkey";

-- DropTable
DROP TABLE "AuthenticationRequirements";

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "facebook_id" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

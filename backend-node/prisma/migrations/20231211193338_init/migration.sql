/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `AuthenticationRequirements` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fullname]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullname` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_uid_fkey";

-- DropIndex
DROP INDEX "Profile_email_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
DROP COLUMN "username",
ADD COLUMN     "fullname" TEXT NOT NULL;

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebook_id_key" ON "User"("facebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fullname_key" ON "Profile"("fullname");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

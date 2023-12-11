/*
  Warnings:

  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[full_name]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "username",
ADD COLUMN     "full_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_full_name_key" ON "Profile"("full_name");

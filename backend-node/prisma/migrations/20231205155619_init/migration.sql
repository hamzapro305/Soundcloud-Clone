/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `follow_id` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `follower_id` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `followedById` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_id_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_pkey",
DROP COLUMN "follow_id",
DROP COLUMN "follower_id",
DROP COLUMN "following_id",
ADD COLUMN     "followedById" TEXT NOT NULL,
ADD COLUMN     "followingId" TEXT NOT NULL,
ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("followingId", "followedById");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

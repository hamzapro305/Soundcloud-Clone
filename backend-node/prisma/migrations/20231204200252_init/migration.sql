-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "likes_count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "likes_count" SET DEFAULT 0,
ALTER COLUMN "plays_count" SET DEFAULT 0,
ALTER COLUMN "comments_count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "followers_count" SET DEFAULT 0,
ALTER COLUMN "following_count" SET DEFAULT 0;

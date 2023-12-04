/*
  Warnings:

  - Added the required column `thumbnail` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_song_playlist_id_fkey";

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SongToPlaylist" (
    "song_id" TEXT NOT NULL,
    "playlist_id" TEXT NOT NULL,

    CONSTRAINT "SongToPlaylist_pkey" PRIMARY KEY ("song_id","playlist_id")
);

-- AddForeignKey
ALTER TABLE "SongToPlaylist" ADD CONSTRAINT "SongToPlaylist_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("song_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongToPlaylist" ADD CONSTRAINT "SongToPlaylist_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "Playlist"("playlist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `MovieLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieLike_userId_movieId_key" ON "MovieLike"("userId", "movieId");

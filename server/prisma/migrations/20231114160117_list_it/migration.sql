/*
  Warnings:

  - Added the required column `synopsis` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anime" (
    "mal_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "position_score" REAL NOT NULL,

    PRIMARY KEY ("mal_id", "listId"),
    CONSTRAINT "Anime_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Anime" ("image", "listId", "mal_id", "position_score", "title") SELECT "image", "listId", "mal_id", "position_score", "title" FROM "Anime";
DROP TABLE "Anime";
ALTER TABLE "new_Anime" RENAME TO "Anime";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

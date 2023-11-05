-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "position_score" REAL NOT NULL,
    CONSTRAINT "Anime_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

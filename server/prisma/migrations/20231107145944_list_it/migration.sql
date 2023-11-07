/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "List_name_userId_key" ON "List"("name", "userId");

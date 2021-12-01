-- CreateTable
CREATE TABLE "_usersWithFavs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_usersWantTry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_usersWithFavs_AB_unique" ON "_usersWithFavs"("A", "B");

-- CreateIndex
CREATE INDEX "_usersWithFavs_B_index" ON "_usersWithFavs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_usersWantTry_AB_unique" ON "_usersWantTry"("A", "B");

-- CreateIndex
CREATE INDEX "_usersWantTry_B_index" ON "_usersWantTry"("B");

-- AddForeignKey
ALTER TABLE "_usersWithFavs" ADD FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usersWithFavs" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usersWantTry" ADD FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_usersWantTry" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

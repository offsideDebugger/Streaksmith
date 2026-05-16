/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Badge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Reward` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Badge" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reward" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Badge_slug_key" ON "Badge"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_slug_key" ON "Reward"("slug");

/*
  Warnings:

  - Made the column `numberPhone` on table `PublicInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PublicInfo" ALTER COLUMN "numberPhone" SET NOT NULL,
ALTER COLUMN "numberPhone" DROP DEFAULT;

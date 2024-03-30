/*
  Warnings:

  - Added the required column `numberPhone` to the `PublicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PublicInfo" ADD COLUMN     "numberPhone" TEXT NOT NULL;

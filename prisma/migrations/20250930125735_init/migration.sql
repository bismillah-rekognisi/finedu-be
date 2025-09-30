/*
  Warnings:

  - Added the required column `isActive` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."blogs" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "isActive" BOOLEAN NOT NULL;

/*
  Warnings:

  - Added the required column `publicKey` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "publicKey" VARCHAR(1024) NOT NULL;

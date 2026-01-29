/*
  Warnings:

  - Made the column `is_active` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

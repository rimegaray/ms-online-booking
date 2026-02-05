/*
  Warnings:

  - Made the column `entity_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `entity_id` INTEGER NOT NULL;

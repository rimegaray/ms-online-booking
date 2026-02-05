/*
  Warnings:

  - You are about to drop the column `patient_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `psychologist_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `patient_id`,
    DROP COLUMN `psychologist_id`,
    ADD COLUMN `entity_id` INTEGER NULL;

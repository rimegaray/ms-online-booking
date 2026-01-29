/*
  Warnings:

  - You are about to drop the column `payment_id` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `payment_id`,
    ADD COLUMN `id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `booking_id_key` ON `booking`(`id`);

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`patient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_psychologist_id_fkey` FOREIGN KEY (`psychologist_id`) REFERENCES `psychologist`(`psychologist_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_id_fkey` FOREIGN KEY (`id`) REFERENCES `payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

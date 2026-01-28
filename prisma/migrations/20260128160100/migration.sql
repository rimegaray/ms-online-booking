/*
  Warnings:

  - You are about to drop the column `id` on the `booking` table. All the data in the column will be lost.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `payment` table. All the data in the column will be lost.
  - You are about to alter the column `payment_id` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - A unique constraint covering the columns `[payment_id]` on the table `booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_uuid` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `booking_id_fkey`;

-- DropIndex
DROP INDEX `booking_id_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `id`,
    ADD COLUMN `payment_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `payment_uuid` VARCHAR(255) NOT NULL,
    MODIFY `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`payment_id`);

-- CreateIndex
CREATE UNIQUE INDEX `booking_payment_id_key` ON `booking`(`payment_id`);

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payment`(`payment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

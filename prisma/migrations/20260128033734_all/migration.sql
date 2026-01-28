/*
  Warnings:

  - You are about to drop the `psychologists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `psychologists`;

-- CreateTable
CREATE TABLE `availability` (
    `availability_id` INTEGER NOT NULL AUTO_INCREMENT,
    `psychologist_id` INTEGER NOT NULL,
    `date` DATE NULL,
    `time_range` VARCHAR(20) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`availability_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `psychologist_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `booking_date` DATETIME(0) NOT NULL,
    `time_range` VARCHAR(20) NOT NULL,
    `state` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `payment_id` VARCHAR(255) NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `age` INTEGER NULL,
    `dni` VARCHAR(255) NULL,
    `phone_number` VARCHAR(255) NULL,
    `tutor_name` VARCHAR(255) NULL,
    `admission_date` VARCHAR(255) NULL,
    `observations` VARCHAR(255) NULL,
    `last_session_date` VARCHAR(255) NULL,
    `signed_consent` LONGBLOB NULL,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` VARCHAR(255) NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(255) NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `payment_transaction_id`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psychologist` (
    `psychologist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `specialty` VARCHAR(255) NOT NULL,
    `experience` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `address` VARCHAR(255) NULL,
    `email` VARCHAR(75) NULL,
    `dni` VARCHAR(8) NULL,
    `phone_number` VARCHAR(255) NULL,
    `photo` VARCHAR(255) NULL,

    PRIMARY KEY (`psychologist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `price` DOUBLE NOT NULL,
    `image` TINYTEXT NOT NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `session_date` DATETIME(6) NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile` VARCHAR(50) NULL,
    `name` VARCHAR(70) NULL,
    `lastname` VARCHAR(70) NULL,
    `patient_id` INTEGER NULL,
    `psychologist_id` INTEGER NULL,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

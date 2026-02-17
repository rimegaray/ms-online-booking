-- CreateTable
CREATE TABLE `availability` (
    `availability_id` INTEGER NOT NULL AUTO_INCREMENT,
    `psychologist_id` INTEGER NOT NULL,
    `date` DATE NULL,
    `time_range` VARCHAR(20) NOT NULL,
    `is_active` VARCHAR(20) NULL,

    UNIQUE INDEX `availability_psychologist_id_date_time_range_key`(`psychologist_id`, `date`, `time_range`),
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
    `payment_id` INTEGER NULL,

    UNIQUE INDEX `booking_payment_id_key`(`payment_id`),
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
    `admission_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `observations` VARCHAR(255) NULL,
    `last_session_date` DATETIME(3) NULL,
    `signed_consent` LONGBLOB NULL,

    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_uuid` VARCHAR(255) NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(255) NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    INDEX `payment_transaction_id`(`transaction_id`),
    PRIMARY KEY (`payment_id`)
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
    `admission_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
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
    `email` VARCHAR(75) NULL,
    `entity_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `auth_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auth_user_id_key`(`user_id`),
    PRIMARY KEY (`auth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`patient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_psychologist_id_fkey` FOREIGN KEY (`psychologist_id`) REFERENCES `psychologist`(`psychologist_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payment`(`payment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

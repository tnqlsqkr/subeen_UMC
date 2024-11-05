-- CreateTable
CREATE TABLE `member` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `address` VARCHAR(40) NOT NULL,
    `spec_address` VARCHAR(40) NULL,
    `email` VARCHAR(50) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `birth` DATE NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_prefer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `member_id`(`member_id`),
    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

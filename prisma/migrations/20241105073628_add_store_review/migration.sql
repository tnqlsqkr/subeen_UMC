-- CreateTable
CREATE TABLE `store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `address` VARCHAR(50) NULL,
    `score` DOUBLE NULL,
    `created_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NULL,
    `storeId` BIGINT NULL,
    `body` TEXT NULL,
    `score` DOUBLE NULL,

    INDEX `review_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

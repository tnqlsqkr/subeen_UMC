-- CreateTable
CREATE TABLE `member_mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NULL,
    `mission_id` BIGINT NULL,
    `status` VARCHAR(15) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    INDEX `member_mission_member_id_idx`(`member_id`),
    INDEX `member_mission_mission_id_idx`(`mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `password` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `member` ADD COLUMN `password` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `store` ADD COLUMN `region_id` BIGINT NULL;

-- CreateIndex
CREATE INDEX `store_region_id_idx` ON `store`(`region_id`);

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

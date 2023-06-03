/*
  Warnings:

  - You are about to drop the `agreement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `agreement`;

-- CreateTable
CREATE TABLE `Contract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startContract` DATETIME(3) NOT NULL,
    `endContract` DATETIME(3) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `typeContract` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

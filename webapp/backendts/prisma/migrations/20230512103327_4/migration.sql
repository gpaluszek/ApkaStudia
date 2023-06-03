/*
  Warnings:

  - Added the required column `profileId` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contract` ADD COLUMN `profileId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

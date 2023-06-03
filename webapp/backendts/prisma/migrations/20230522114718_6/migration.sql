-- DropForeignKey
ALTER TABLE `contract` DROP FOREIGN KEY `Contract_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

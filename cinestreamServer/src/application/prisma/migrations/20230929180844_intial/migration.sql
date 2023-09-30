-- CreateTable
CREATE TABLE `film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `premiere` VARCHAR(191) NOT NULL,
    `runtime` INTEGER NOT NULL,
    `imdbScore` DOUBLE NOT NULL,
    `langage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

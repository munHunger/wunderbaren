CREATE SCHEMA `wunderbaren` ;
CREATE TABLE `wunderbaren`.`item` (
  `name` VARCHAR(126) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `amount` INT NULL,
  `price` INT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

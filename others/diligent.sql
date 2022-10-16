CREATE TABLE `sql6526609`.`user` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Reference` VARCHAR(45) NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Username` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `IsDeleted` VARCHAR(45) NULL DEFAULT 0,
  `CreatedOn` DATETIME NULL,
  `UpdatedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));

CREATE TABLE `sql6526609`.`product` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Reference` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `Price` VARCHAR(45) NULL,
  `Currency` VARCHAR(45) NULL DEFAULT 'USD',
  `Description` VARCHAR(45) NULL,
  `UserId` VARCHAR(45) NULL,
  `IsDeleted` VARCHAR(45) NULL DEFAULT 0,
  `CreatedOn` DATETIME NULL,
  `UpdatedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));

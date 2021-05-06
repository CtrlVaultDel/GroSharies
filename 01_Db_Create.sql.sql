Use [master]

IF db_id('GroSharies') IS NULL
	CREATE DATABASE [GroSharies]
GO

USE [GroSharies]
GO

DROP TABLE IF EXISTS [ListItem];
DROP TABLE IF EXISTS [Purchase];
DROP TABLE IF EXISTS [ShoppingList];
DROP TABLE IF EXISTS [HouseholdUser];
DROP TABLE IF EXISTS [Household];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [Household] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseId] nvarchar(28) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,

  CONSTRAINT UQ_FirebaseId UNIQUE(FirebaseId)
)
GO

CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [ShoppingList] (
  [Id] integer PRIMARY KEY IDENTITY,
  [HouseholdId] integer NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [DateCreated] datetime NOT NULL,

  CONSTRAINT [FK_ShoppingList_Household] FOREIGN KEY ([HouseholdId]) REFERENCES [Household] ([Id]) ON DELETE CASCADE
)
GO

CREATE TABLE [Purchase] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ShoppingListId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [Vendor] nvarchar(50) NOT NULL,
  [PurchaseDate] datetime NOT NULL,
  [TotalCost] decimal (18,2) NOT NULL,

  CONSTRAINT [FK_Purchase_ShoppingList] FOREIGN KEY ([ShoppingListId]) REFERENCES [ShoppingList] ([Id]) ON DELETE CASCADE, 
  CONSTRAINT [FK_Purchase_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
)
GO

CREATE TABLE [ListItem] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ShoppingListId] integer NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [IsChecked] bit NOT NULL DEFAULT 0,

  CONSTRAINT [FK_ListItem_ShoppingList] FOREIGN KEY ([ShoppingListId]) REFERENCES [ShoppingList] ([Id]) ON DELETE CASCADE
)
GO

CREATE TABLE [HouseholdUser] (
  [Id] integer PRIMARY KEY IDENTITY,
  [HouseholdId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [UserTypeId] integer NOT NULL,
  [IsAccepted] bit NOT NULL DEFAULT 0,

  CONSTRAINT [FK_HouseholdUser_Household] FOREIGN KEY ([HouseholdId]) REFERENCES [Household] ([Id]) ON DELETE CASCADE,
  CONSTRAINT [FK_HouseholdUser_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE,
  CONSTRAINT [FK_HouseholdUser_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
)
GO

INSERT INTO UserType ([Name]) VALUES ('Admin');
INSERT INTO UserType ([Name]) VALUES ('Member');
-- create database Conmpany;
-- drop database Conmpany;
-- create database company;
-- use company;

create table login (
    loginNo int IDENTITY(1,1) PRIMARY KEY,
    loginUserName varchar(20),
    loginPassword varchar(20)
);

create table department (
    departmentNo int IDENTITY(1,1) PRIMARY KEY,
    departmentName varchar(20),
    departmentLocation varchar(20)
);

create table employee (
    employeeNo int IDENTITY(1,1) PRIMARY KEY,
    employeename varchar(50),
    salary int,
    departmentNo int references department(departmentNo),
    lastModifyDate datetime
);


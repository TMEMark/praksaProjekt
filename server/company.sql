 create database company;
 use company;

 create table login (
     loginNo int not null PRIMARY KEY auto_increment,
     loginUserName varchar(20),
     loginPassword varchar(20)
 );

 create table department (
     departmentNo int not null PRIMARY KEY auto_increment,
     departmentName varchar(20),
     departmentLocation varchar(20)
 );

 create table employee (
     employeeNo int not null PRIMARY KEY auto_increment,
     employeename varchar(50),
     salary int,
     departmentNo int references department(departmentNo),
     lastModifyDate datetime
);

select * from department
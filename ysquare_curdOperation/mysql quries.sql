create database ySquare;
use ySquare;
select * from  student;

create table student(student_id int(5) not null primary key auto_increment, 
first_name varchar(50) not null,
last_name varchar(50) not null,
gender varchar(10) not null,
date_of_birth date not null,
age int(3) not null,
department varchar(100) not null,
address varchar(100) not null,
mail_id varchar(30) not null,
mobile_number int(12) not null,
status varchar(10) not null,
created_by varchar(20) not null,
created_on datetime not null,
modified_by varchar(10) default null,
modified_on datetime default null,
effective_from date default null,
effective_to date default null
) auto_increment=100;

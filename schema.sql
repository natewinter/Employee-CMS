DROP DATABASE IF EXISTS employeeDb;
CREATE DATABASE employeeDb;

USE employeeDb;

CREATE TABLE departmentTb(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roleTb(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    PRIMARY KEY(id)
);

CREATE TABLE employeeTb(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO departmentTb(name)
VALUE ("Garden");

INSERT INTO roleTb(title, salary)
VALUE ("garden hand", 420.20);

INSERT INTO employeeTb(first_name,last_name,role_id)
VALUE ("J", "B",1);

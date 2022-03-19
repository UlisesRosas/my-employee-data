-- deletes the company database if it already exists to prevent duplicates
DROP DATABASE IF EXISTS company;
DROP DATABASE IF EXISTS role;
DROP DATABASE IF EXISTS employe;

-- creates the data base named company that will have multiple tables
CREATE DATABASE company;   
USE company;

CREATE TABLE department (
    -- PRIMARY KEY IS AN IDENTIFIER FOR THE TABLE that will be referenced by another table
    id INT  AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(30) NOT NULL
);

CREATE TABLE role (
   id INT  AUTO_INCREMENT PRIMARY KEY, 
   title VARCHAR(30) NOT NULL,
   salary DECIMAl(10,2) NOT NULL,
   department_id INT NOT NULL,
--    naming a relationship, the colomn is related to the department column, the related colums will be deleted if one is deleted
-- constraint is a variable that we named fk_department
   CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    -- id beimg referenced by the manager
    id INT  AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,

    manager_id INT,
    -- reference itself and we dont want to delete the employees under the manager
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
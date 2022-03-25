const connection = require('./connection')

// build class with methods and 1 query per method
class DB {
    constructor(connection) {
        // connects the database to the class
        this.connection = connection;
    }
    // methods
    // view all departments
    viewAllDepartments() {
        return this.connection.promise().query(
            `   SELECT
                    department.id,
                    department.name
                FROM
                    department
            `
        )
    }

    // view all roles
    viewAllRoles() {
        return this.connection.promise().query(
            ` 
          SELECT
                role.id,
                role.title,
                role.salary,
                department.name
            FROM 
                role
            LEFT JOIN
                department ON role.department_id = department.id
          `
        )
    }

    // view all employees 
    viewALLEmployees() {
        return this.connection.promise().query(
            `
            SELECT 
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.department_id,
                role.salary,
                employee.manager_id
            FROM 
                employee
            LEFT JOIN 
                role ON employee.role_id = role.id
            `
        )
    }

    // add a department
    addDepartment(department) {
        return this.connection.promise().query(
            `
        INSERT INTO
            department
        SET
            ?
        `, department
        )
    }

    // add role
    addRole(role) {
        // returns the query in promise form
        return this.connection.promise().query(
            // the SET method adds all the values for this role without specifying
            `
        INSERT INTO 
            role 
        SET 
            ?
            `, role
        )
    }

    // add employee
    addEmployee(employee) {
        return this.connection.promise().query(
             // the SET method adds all the values for this role without specifying
            `
        INSERT INTO
            employee
        SET
            ?
            `, employee
        )
    }

    // update employee role 
    updateEmployeeRole(employee) {
        return this.connection.promise().query(
            // mysql query that updates the role_id with prepared statements '?'
            `
        UPDATE 
            employee
        SET
            role_id = ?
        WHERE
            id = ?
            `, employee
        )
    }



}
 

module.exports = new DB(connection);
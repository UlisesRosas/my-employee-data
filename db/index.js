const connection = require('./connection')
// build class with methods and 1 query per method
class DB { 
    constructor(connection){
        this.connection = connection
    }
// view all departments
    viewAllDepartments(){
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
    viewAllRoles(){
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

// add a department
addDepartment(department){
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

// add employee

// update employee role 





}

// 

module.exports = new DB(connection);
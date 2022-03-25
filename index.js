const inquirer = require('inquirer');
const db = require('./db');
const DB = require('./db');
require('console.table'); 

async function mainMenu(){
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            // is what we pass in up above in line 7 which is our user input
            name: 'selection',
            message: 'What would you like to do?',
            choices:[
                'view all departments',
                'view all roles',
                'view all employees',
                'add department',
                'add role',
                'add employee'
            ]
        }
    ])
    // pass in our user input as a condition to trigger switch statement
    switch (selection){
        case 'view all departments':
            return viewAllDepartments();
        case 'view all roles':
            return viewAllRoles();
        case 'view all employees':
            return viewALLEmployees();
        case 'add department':
            return addDepartment();
        case 'add role':
            return addRole();
        case 'add employee': 
            return addEmployee();
    }
}

async function viewAllDepartments(){
    const [departments] = await db.viewAllDepartments();
    console.table(departments)
    return mainMenu();
}

async function viewAllRoles(){
    // array destructuring
    const [roles] = await db.viewAllRoles();
    // displays tabular data as a table and it takes one argument that must be an array or object
    console.table(roles);
    return mainMenu();
}

// function to view all employees
async function viewALLEmployees() {
    const [employee] = await db.viewALLEmployees();
    console.table(employee);
    return mainMenu();
}

async function addDepartment(){
    const department = await inquirer.prompt([
        {
            type: 'input',
            // department tabel fieald that you are getting values for
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ])
    await db.addDepartment(department);
    return mainMenu();
}

// function to get input for 
async function addRole() {
    const [role] = await inquirer.prompt([
        // grabs data for name of the role
        {
            type: 'input',
            // role table field you are geting values for 
            name: 'title',
            message: 'What is the name for this role?'
        },
        // grabs salary for rol table value
        {
            type:'input',
            // role table field you are geting values for 
            name: 'salary',
            message: 'Wha is the salary for this role'
        },
        // grabs data for the roles department
        {
            type:'input',
            // role table field you are geting values for 
            name:'department_id',
            message:'What is the department id for this role?'

        }
    ])
    await db.addRole(role);
    return mainMenu();
}

// function to add employee
async function addEmployee() {
    // this one will cause error if brakets are addad [employee]
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message:'What is your first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message:'What is your last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message:'What is your role id?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message:'What is your managers id?',
            // default: 'null'
        }

    ])
    await db.addEmployee(employee);
    return mainMenu();
}
mainMenu();
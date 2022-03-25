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
                'add department',
                'add role'
            ]
        }
    ])
    // pass in our user input as a condition to trigger switch statement
    switch (selection){
        case 'view all departments':
            return viewAllDepartments();
        case 'view all roles':
            return viewAllRoles();
        case 'add department':
            return addDepartment();
        case 'add role':
            return addRole();
    }
}

async function viewAllDepartments(){
    const [departments] = await db.viewAllDepartments();
    // console.table(departments)
    return mainMenu();
}

async function viewAllRoles(){
    // array destructuring
    const [roles] = await db.viewAllRoles();
    // displays tabular data as a table and it takes one argument that must be an array or object
    // console.table(roles);
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
    const role = await inquirer.prompt([
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
            name: 'salary',
            message: 'Wha is the salary for this role'
        },
        // grabs data for the roles department
        {
            type:'input',
            name:''

        }
    ])
}
mainMenu();
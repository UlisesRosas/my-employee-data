const inquirer = require('inquirer');
const db = require('./db');
const DB = require('./db');
require('console.table'); 

async function mainMenu(){
    const {selection} = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices:[
                'view all departments',
                'view all roles',
                'add department'
            ]
        }
    ])
    switch (selection){
        case 'view all departments':
            return viewAllDepartments();
        case 'view all roles':
            return viewAllRoles();
        case 'add department':
            return addDepartment();
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
    console.table(roles);
    return mainMenu();
}

async function addDepartment(){
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ])
    await db.addDepartment(department);
    return mainMenu();
}
mainMenu();
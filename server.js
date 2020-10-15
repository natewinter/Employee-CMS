// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "password",
    database: "employeeDb"
})

connection.connect(function (err) {
    if (err) throw err
    start()
})

function start() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "please chose an option?",
        choices: ["add a department", "add a role", "add an employee", "update employee", "view departments", "view roles", "view employees", "quit"]
    }).then(function ({
        options
    }) {
        if (options === "add a department") {
            addDepartment()
        } else if (options === "add an employee") {
            addEmployee()
        } else if (options === "add a role") {
            addRole()
        } else if (options === "update employee") {
            updateEmployee()
        } else if (options === "view departments") {
            allDepartments()
        } else if (options === "view roles") {
            allRoles()
        } else if (options === "view employees") {
            allEmployees()
        } else {
            connection.end()
        }
    })
}



function addDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "what is the name of the department you would like to add?"
    }]).then(function (answers) {
        connection.query("INSERT INTO departmentTb SET ?", {
            name: answers.name
        }, function (err) {
            if (err) throw err
            start()
        })
    })

}

function addEmployee() {
    connection.query("SELECT * FROM roleTb", function (err, data) {
        if (err) throw err

        let roleArr = data.map(function (dep) {
            return {
                name: dep.title,
                value: dep.id
            }
        })



        inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee you like to add??"
        }, {
            name: "lastName",
            type: "input",
            message: "what is the last name of the employee you'd like to add?"
        }, {
            name: "managerId",
            type: "confirm",
            message: "is this employee a manager?"

        }, {
            name: "roleId",
            type: "list",
            message: "What is the roll of this employee?",
            choices: roleArr
        }]).then(function (answers) {
            connection.query("INSERT INTO employeeTb SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                manager_id: answers.managerId,
                role_id: answers.roleId
            }, function (err) {
                if (err) throw err
                start()
            })
        })
    })
}

function addRole() {
    inquirer.prompt([{
            name: "role",
            type: "input",
            message: "what is the role you would like to add?"
        }, {
            name: "salary",
            type: "input",
            message: "what is the salary for this role?"
        }]


    ).then(function (answers) {
        connection.query("INSERT INTO roleTb SET ?", {
            title: answers.role,
            salary: answers.salary
        }, function (err) {
            if (err) throw err
            start()
        })
    })
}

function updateEmployee() {
    connection.query("SELECT * FROM roleTb", function (err, data) {
        if (err) throw err

        let roleArr = data.map(function (dep) {
            return {
                name: dep.title,
                value: dep.id
            }
        })



        inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee you like to add??"
        }, {
            name: "lastName",
            type: "input",
            message: "what is the last name of the employee you'd like to add?"
        }, {
            name: "managerId",
            type: "confirm",
            message: "is this employee a manager?"

        }, {
            name: "roleId",
            type: "list",
            message: "What is the roll of this employee?",
            choices: roleArr
        }]).then(function (answers) {
            connection.query("INSERT INTO employeeTb SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                manager_id: answers.managerId,
                role_id: answers.roleId
            }, function (err) {
                if (err) throw err
                start()
            })
        })

    })
}

function allDepartments() {
    connection.query("SELECT * FROM departmentTb", function (err, data) {
        if (err) throw err
        console.table(data)
        start()
    })
}

function allRoles() {
    connection.query("SELECT * FROM roleTb", function (err, data) {
        if (err) throw err
        console.table(data)
        start()
    })
}

function allEmployees() {
    connection.query("SELECT * FROM employeeTb", function (err, data) {
        if (err) throw err
        console.table(data)
        start()
    })
}
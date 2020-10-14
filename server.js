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

function start(){
    inquirer.prompt({
        name:"options",
        type:"list",
        message:"please chose an option?",
        choices:["add a department", "add an employee","quit"]
    }).then(function({options}){
        if(options === "add a department"){
            addDepartment()
        }else if(options === "add an employee") {
            addEmployee()
        }else{
            connection.end()
        }
    })
}


function addDepartment(){
    inquirer.prompt({
        name:"name",
        type:"input",
        message:"what is the name of the department you would like to add?"
        }).then(function(answers){
            connection.query("INSERT INTO departmentTb SET ?",{name:answers.name},function(err){
                if (err) throw err
                start()
            })
        })

}

// function addEmployee() {
//     connection.query("SELECT * FROM departmentTb", function (err, data) {
//         if (err) throw err

//         let depArr = data.map(function (dep) {
//             return {
//                 name: dep.title,
//                 value: dep.id
//             }
//         })



//         inquirer.prompt([
//             {
//                 name: "name",
//                 type: "input",
//                 message: "What is the name of the employee you like to add??"
//             }, {
//                 name: "cool",
//                 type: "confirm",
//                 message: "is this employee cool??"
//             }, {
//                 name: "depId",
//                 type: "list",
//                 message: "What is the department of this employee??",
//                 choices: depArr
//             }, {
//                 name: "salary",
                
//                 type: "number",
//                 message: "how much money is this one making??"
//             },
//         ]).then(function (answers) {
//             connection.query("INSERT INTO crew SET ?", {
//                 name: answers.name,
//                 cool: answers.cool,
//                 salary: answers.salary,
//                 department_id: answers.depId
//             }, function (err) {
//                 if (err) throw err
//                 start()
//             })
//         })

//     })
// }
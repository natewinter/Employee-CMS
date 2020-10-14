// Dependencies
var inquirer = require("inquier");
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
})

function start(){
    console.log("yay")
}
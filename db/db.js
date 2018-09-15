var mysql      = require('mysql');
var util = require('util')

var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'veselatest',
    user     : 'root',
    password : '',
});
connection.query = util.promisify(connection.query)

function getTodos() {
    return connection.query('SELECT * FROM todoapi')
}

function getTodo(id) {
    return connection.query(`SELECT * FROM todoapi WHERE id = ${id}`)
}

function postTodo(todo) {
    return connection.query(`INSERT INTO todoapi (title,description) VALUES('${todo.title}','${todo.description}')`)
}

function deleteTodo(id) {
    return connection.query(`DELETE FROM todoapi WHERE id = ${id}`)
}

function putTodo(todo) {
    return connection.query(`UPDATE todoapi SET title = '${todo.title}', description = '${todo.description}' WHERE id = ${todo.id}`)
}

export default {
    getTodo,
    getTodos,
    postTodo,
    deleteTodo,
    putTodo
}

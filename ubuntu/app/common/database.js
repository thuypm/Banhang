var config =require('config');
var sql = require('mysql');
var connection = sql.createConnection({
    host:  config.get("mysql.host"),
    port: config.get("mysql.port"),
    user: config.get("mysql.username"),
    password: config.get("mysql.password"),
    database: config.get("mysql.database"),
});
connection.connect();
function getConnection(){
    if(!connection){
            connection.connect();
    };
    return  connection;
};
module.exports = {
    getConnection: getConnection
}

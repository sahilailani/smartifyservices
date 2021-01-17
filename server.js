var mqtt = require('mqtt');
var mysql = require('mysql');
var moment = require('moment');
var parser = require('./parser');

var mqttOptions = {
  clientId: "mqttjs05",
  username: "zxcvnm!",
  password: "Servestack@123",
  clean: true
};

var sqlConfig = {
  user: 'anupsmartify',
  password: '12345',
  server: '148.66.145.23',
  database: 'anupsmartify' 
};
/*
var sqlConfig = {
  user: 'doadmin',
  password: 'fkmfji4fnpib38dd',
  server: 'db-mysql-blr1-93609-do-user-8411318-0.b.db.ondigitalocean.com',
  database: 'defaultdb'
};*/
/*
username = doadmin
password = fkmfji4fnpib38dd
host = db-mysql-blr1-93609-do-user-8411318-0.b.db.ondigitalocean.com
port = 25060
database = defaultdb
sslmode = REQUIRED
*/
var con = mysql.createConnection({
  host: sqlConfig.server,
  user: sqlConfig.user,
  password: sqlConfig.password,
  database: sqlConfig.database
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

var client = mqtt.connect("mqtt://68.183.246.170", mqttOptions);
console.log("connected flag  " + client.connected);

// subscribe to testtopic to see this msg
client.on("connect", function () {
  console.log("connected  " + client.connected);
  client.publish("testtopic", "test message working !");
});

client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1)
});

var topic = "+/client";
client.subscribe(topic, { qos: 1 });

// client.on('message', function (topic, message, packet) {

//   let messageReceived = message.toString();
//   let data = parser.parse(message);
//   // console.log(data, '------------');


//   var sql = "INSERT INTO LogData (UniqueNumber, Output, Status, Date_time) VALUES ?";
//   var values = data;

//   con.query(sql, [values], function (err, result, fields) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(fields);
//   });

//   let date_time = moment().utc().format("YYYY-MM-DD HH:mm:ss");

//   var incomingMessageSQL = `INSERT INTO IncomingMessage (Message, Date_time, IsConsumed) VALUES ('${messageReceived}', '${date_time}', 0)`;
//   con.query(incomingMessageSQL, function (err, result, fields) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(fields);
//   });

// });


// rest api server start
require('./api')(con);
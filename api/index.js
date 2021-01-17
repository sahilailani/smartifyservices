'use strict';

const express = require("express");

const helmet = require('helmet');

const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('./mysql');

const service = require('./service');


const port = 8080;

const app = express();
app.use(helmet());


app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html', limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./api-doc/swagger.json');

// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerDocument));


// handel error
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    message: err.message
  });
})

// api/  end pints 
app.use('/api', service.router);



module.exports = function (mysqlCon) {
  mysql(app, mysqlCon);
  // start app
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
  });

}
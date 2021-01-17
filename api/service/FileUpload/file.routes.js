const express = require('express');
const controller = require('./file.controller');

const routes = express.Router();

routes.post('/uploads', controller.fileupload);


module.exports = routes;
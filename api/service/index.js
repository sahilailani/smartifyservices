const express = require('express');
const files = require('./FileUpload')

const router = express.Router();

router.use('/files', files.routes);

module.exports = { router };


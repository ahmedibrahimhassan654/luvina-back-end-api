const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const { healthyCheck } = require('./controllers');
const {} = require('./joi/validationSchemas');

const {} = require('./endPoints');

const router = express.Router();

router.get('/healthy', healthyCheck);

module.exports = router;

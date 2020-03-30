const express = require('express');
const router = express.Router();
const IntegrationController = require('./src/app/Controllers/IntegrationController')

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: 'Welcome Integration LinkApi Backend Test',
        version: "1.0"
    });
});

module.exports = router;
"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const RegRouter = require('./routes/RegRouter')
const RegAdmRouter = require('./routes/RegAdmRouter')
const LogRouter = require('./routes/LogRouter')
const AdmRouter = require('./routes/AdmRouter')

const app = express();

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)

router.post('/register', RegRouter);
router.post('/register-admin', RegAdmRouter);
router.post('/login', LogRouter);
router.post("/admin", AdmRouter);

app.use(router)
let port = process.env.PORT || 9000;
let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});

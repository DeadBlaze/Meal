const express =  require("express");
const router = express.Router();

const AdmCtrl = require("../controllers/AdmCtrl");

router.post('/admin', AdmCtrl.Parse);

module.exports = router;
const  express =  require("express");
const router = express.Router();
const RegisterAdmCtrl = require("../controllers/RegAdmCtrl");

router.post('/register-admin', RegisterAdmCtrl.AddUser);

module.exports = router;
const  express =  require("express");
const router = express.Router();
const RegisterCtrl = require("../controllers/RegCtrl");

router.post('/register', RegisterCtrl.AddUser);

module.exports = router;
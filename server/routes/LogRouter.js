const  express =  require("express");
const router = express.Router();
const LogCtrl = require("../controllers/LogCtrl");

router.post('/login', LogCtrl.In);

module.exports = router;
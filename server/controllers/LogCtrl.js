const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const DB = require('../db');
const db = new DB("sqlitedb")

exports.In = function (req, res){
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');

    if (!user) return res.status(404).send('No user found.');

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);

    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign(
      { id: user.id },
      config.secret,
      { expiresIn: 86400 // expires in 24 hours
      });

    res.status(200).send({
      auth: true,
      token: token,
      user: user
    });
  });
}

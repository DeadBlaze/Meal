const DB = require('../db');
const db = new DB("sqlitedb")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.AddUser = function (req, res){
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
      ],
      function (err) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting user")
    
            let token = jwt.sign(
                {
                  id: user.id
                },
                config.secret,
                {
                  expiresIn: 86400 // expires in 24 hours
                });
    
            res.status(200).send(
              {
                auth: true,
                token: token,
                user: user
              });
          });
      });
};
"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = new DB("sqlitedb")
const puppeteer = require('puppeteer');


const app = express();
const parser = bodyParser.urlencoded({extended: false});

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

router.post('/register', function(req, res) {
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
});

router.post('/register-admin', function(req, res) {
  db.insertAdmin([
      req.body.name,
      req.body.email,
      bcrypt.hashSync(req.body.password, 8),
      1
  ],
  function (err) {
    if (err) return res.status(500).send("There was a problem registering the user.")

    db.selectByEmail(req.body.email, (err,user) => {
      if (err) return res.status(500).send("There was a problem getting user")
      let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    });
  });
});
router.post('/login', (req, res) => {
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
})

router.post("/forma", parser, function(request, response){
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);
  //console.log(site);
  let link = request.body.site;

  (async () => {

  let flag = true;
  let res = [];
  let counter = 1;

    try{
      let browser = await puppeteer.launch({
        headless: true,
        slowMo: 100,
        devtools: true
      })
      let page = await browser.newPage()
      await page.setViewport({
        width: 1400, height: 900
      })

      while(flag){
      await page.goto(`${link}`)
      await page.waitForSelector('div.vendor-information__content')
      let html = await page.evaluate(async () =>{
        let page = []

        try{
          let divs = document.querySelectorAll('li.menu-product')

          divs.forEach(li => {


              let obj = {
                title: li.querySelector('div.menu-product__title').innerText,
                cost: li.querySelector('div.menu-product__price').innerText,
                picture: li.querySelector('div.menu-product__img').getAttribute('data-src')
              }

              page.push(obj);

          })



        } catch(e){
          console.log(e);
        }
        return page
      }, {waitUntil: 'div.vendor-information__content'})
      await res.push(html);
      counter++;
      console.log(res);
      flag = false;
    }

    //await browser.close();

    /*res = res.flat()

      fs.writeFile('kfc.json', JSON.stringify({'data':res}), err => {
        if(err) throw err
        console.log('kfc.json saved');
        console.log('kfc.json length - ', res.length);
      });*/

    } catch(e){
      console.log(e);
    }
  })();
});

app.use(router)
let port = process.env.PORT || 9000;
let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});

const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const parser = bodyParser.urlencoded({extended: false});

exports.Parse = function (request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
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
}
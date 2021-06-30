//Парсер ресторанов
const fs = require('fs');
const puppeteer = require('puppeteer');

let link = 'https://www.delivery-club.ru/srv/KFC_krsk';

(async () => {

let flag = true;
let res = [];
let counter = 1;

  try{
    let browser = await puppeteer.launch({
      headless: false,
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
              //picture: li.querySelector('div.menu-product__img.lazyloaded').src
            }

            page.push(obj);

//div.vendor-menu__section
//div.menu-product__title



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

  } catch(e){
    console.log(e);
  }
})();

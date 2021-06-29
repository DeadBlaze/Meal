//Парсер ресторанов
const fs = require('fs');
const puppeteer = require('puppeteer');

let link = 'https://www.delivery-club.ru/krasnoyarsk/page';

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
    await page.goto(`${link}${counter}`)
    await page.waitForSelector('ul.vendor-list__ul')
    let html = await page.evaluate(async () =>{
      let page = []

      try{
        let divs = document.querySelectorAll('li.vendor-item')
        divs.forEach(li => {
          let a = li.querySelector('h3.vendor-item__title-text')

          let obj = {
            title: a.innerText,
            link: li.querySelector('a.vendor-item__link').href
          }

          page.push(obj);
        })



      } catch(e){
        console.log(e);
      }
      return page
    }, {waitUntil: 'a.gray-btn--lg vendor-list__btn--load-more'})
    await res.push(html);
    counter++;
    console.log(res);
    for(let i in res){
      if(res[i].length === 0) flag = false
    }
  }

  await browser.close();

  } catch(e){
    console.log(e);
  }
})();

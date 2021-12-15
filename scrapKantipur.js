const puppeteer = require('puppeteer');
const JSONData = require('./data.json');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://ekantipur.com/');

    const frontPageHeadlines = await page
      .evaluate(() => {
        //* to scrap front page headlines
        const articles = document.querySelectorAll('.main-news > article');
        articlesArray = [...articles];
        const data = [];
        for (let i = 0; i < articlesArray.length; i++) {
          console.log("here: " + articlesArray.length);
          const newsKiker = articlesArray[i].childNodes[4].childNodes[0] ? articlesArray[i].childNodes[4].childNodes[0].textContent : "missing";
          const heading = articlesArray[i].childNodes[6].childNodes[0] ? articlesArray[i].childNodes[6].childNodes[0].textContent.trim() : "missing";
          const headingNav = articlesArray[i].childNodes[6].childNodes[0] ? articlesArray[i].childNodes[6].childNodes[0].getAttribute('href') : "missing";
          const mediaNav = articlesArray[i].childNodes[7].childNodes[0].childNodes[0] ? articlesArray[i].childNodes[7].childNodes[0].childNodes[0].getAttribute("href") : "missing";
          const mediaSrc = articlesArray[i].childNodes[7].childNodes[0].childNodes[0].childNodes[0] ? articlesArray[i].childNodes[7].childNodes[0].childNodes[0].childNodes[0].getAttribute('src') : "missing";
          data.push({
            "newsKiker": newsKiker,
            "heading": heading,
            "headingNavigation": headingNav,
            "mediaNavigation": mediaNav,
            "mediaSource": mediaSrc,
          });       
      }
        return data;
      });
    console.log(frontPageHeadlines);
    
  console.log('result:', frontPageHeadlines.length)

  await browser.close()
})()

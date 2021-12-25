const puppeteer = require('puppeteer');
const save = require("../utils/save");
module.exports = (async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  //* to scrap front page headlines
  await page.goto('https://ekantipur.com/');
  const frontPageHeadlines = await page.evaluate(() => {
    const articles = document.querySelectorAll('.main-news > article');
    articlesArray = [...articles];
    const data = [];
    for (let i = 0; i < articlesArray.length; i++) {
      data.push({
        "newsKiker": newsKiker,
        "heading": heading,
        "headingNavigation": headingNav,
        "mediaNavigation": mediaNav,
        "mediaSource": mediaSrc,
      });
    }
    return JSON.stringify(data);
  }).then(() => {
    console.log(" front page headlines fetched!!");

  }).catch(err => {
    console.log("Error While Inserting frontPAgeHeadlines\n:" + err);
  });
  //add to data
  dataPrototype.news.ekantipur.frontPageHeadlines.items.push(frontPageHeadlines);
  console.log()
  //* to scrap sports news
  await page.goto("https://ekantipur.com/sports");
  const sportsHeadlines = await page.evaluate(() => {
    const data = [];
    const catagory = document.querySelector(".listLayout .row > .cat_name > .catName").textContent;
    const sportsArticles = document.querySelectorAll(".listLayout .row > div:nth-child(2) article");
    //* we get objects from above selector. To loop through each object we have to destructure as to an array... 
    temp = [...sportsArticles];
    temp.forEach(x => {
      data.push({
        "headline": x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
        "headlineNavigation": x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].getAttribute("href") : "missing",
        "author": x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].textContent : "missing",
        "authorProfileNavigation": x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].getAttribute("href") : "missing",
        "hedlineSummery": x.childNodes[0].childNodes[2] ? x.childNodes[0].childNodes[2].textContent : "missing",
        "mediaSrc": x.childNodes[1].childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("data-src") || x.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("src") : "missing",
        "mediaNavigation": x.childNodes[1].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].getAttribute("href") : "missing"
      });
    })
    return JSON.stringify(data);
  }).then(() => {
    console.log(" sports headlines fetched!!");
  }).catch(err => {
    console.log("Error While fetching sports news\n:" + err);
  });

  //* to screp technology news
  await page.goto("https://ekantipur.com/technology");
  const technologyNews = await page.evaluate(() => {
    const data = [];
    const catagory = document.querySelector(".listLayout .row > .cat_name > .catName").textContent;
    const techArticles = document.querySelectorAll(".listLayout .row > div:nth-child(2) article");
    temp = [...techArticles];
    temp.forEach((x, index) => {
      data.push({
        "headline": x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
        "headlineNavigation": x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].getAttribute("href") : "missing",
        "author": x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].textContent : "missing",
        "authorProfileNavigation": x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].getAttribute("href") : "missing",
        "hedlineSummery": x.childNodes[0].childNodes[2] ? x.childNodes[0].childNodes[2].textContent : "missing",
        "mediaSrc": x.childNodes[1].childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("data-src") || x.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("src") : "missing",
        "mediaNavigation": x.childNodes[1].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].getAttribute("href") : "missing"
      });
    })
    return JSON.stringify(data);
  }).then(() => {
    console.log("tech news fetched!!");

  }).catch((error) => {
    console.log("error while fetching tech news : \n" + error);
  });
  await browser.close();
  save.saveEkantipurNews(frontPageHeadlines, technologyNews, sportsHeadlines);

});
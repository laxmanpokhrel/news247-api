const puppeteer = require('puppeteer');
const fs = require('fs');
const JSONDFile = require('./data.json');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //* to scrap front page headlines
  await page.goto('https://ekantipur.com/');
  const frontPageHeadlines = await page.evaluate(() => {
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

  //* to scrap sports news
  await page.goto("https://ekantipur.com/sports");
  const sportsHeadlines = await page.evaluate(() => {
    const sportsData = [];
    const catagory = document.querySelector(".listLayout .row > .cat_name > .catName").textContent;
    const sportsArticles = document.querySelectorAll(".listLayout .row > div:nth-child(2) article");
    //we get objects from above selector. To loop through each object we have to destructure as to an array... 
    temp = [...sportsArticles];
    // for (let i = 0; i < temp.length; i++) {
    //   sportsData.push({
    //     headline: temp[i].childNodes[0].childNodes[0].childNodes[0] ? temp[i].childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
    //     headlineNavigation: temp[i].childNodes[0].childNodes[0].childNodes[0] ? temp[i].childNodes[0].childNodes[0].childNodes[0].getAttribute("href") : "missing",
    //     author: temp[i].childNodes[0].childNodes[1].childNodes[0] ? temp[i].childNodes[0].childNodes[1].childNodes[0].textContent : "missing",
    //     authorProfileNavigation: temp[i].childNodes[0].childNodes[1].childNodes[0] ? temp[i].childNodes[0].childNodes[1].childNodes[0].getAttribute("href") : "missing",
    //     hedlineSummery: temp[i].childNodes[0].childNodes[2] ? temp[i].childNodes[0].childNodes[2].textContent : "missing",
    //     mediaSrc: temp[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0] ? temp[i].childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("data-src") : "missing",
    //     mediaNavigation: temp[i].childNodes[1].childNodes[0].childNodes[0] ? temp[i].childNodes[1].childNodes[0].childNodes[0].getAttribute("href") : "missing"
    //   });
    // }
    temp.forEach(x => {
      sportsData.push({
        headline: x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
        headlineNavigation: x.childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[0].childNodes[0].childNodes[0].getAttribute("href") : "missing",
        author: x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].textContent : "missing",
        authorProfileNavigation: x.childNodes[0].childNodes[1].childNodes[0] ? x.childNodes[0].childNodes[1].childNodes[0].getAttribute("href") : "missing",
        hedlineSummery: x.childNodes[0].childNodes[2] ? x.childNodes[0].childNodes[2].textContent : "missing",
        mediaSrc: x.childNodes[1].childNodes[0].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute("data-src") : "missing",
        mediaNavigation: x.childNodes[1].childNodes[0].childNodes[0] ? x.childNodes[1].childNodes[0].childNodes[0].getAttribute("href") : "missing"
      });
    })
    return sportsData;
  });
  // const dataRead = JSON.parse(fs.readFileSync("data.json"));
  // console.log(dataRead);
  // fs.writeFile("data.json", JSON.stringify(frontPageHeadlines), (error) => {
  //   console.log("error occured");
  // });
  // JSONData.news.ekantipur.frontPageHeadlines.push();
  // JSONData.news.push(frontPageHeadlines);
  console.log(frontPageHeadlines);
  console.log(sportsHeadlines);
  // console.log("Result is :", JSONData.news.ekantipur.frontPageHeadlines.push(frontPageHeadlines));
  await browser.close();
})();

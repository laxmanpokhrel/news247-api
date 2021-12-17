const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.onlinekhabar.com/");

    const frontPageHeadlines = await page.evaluate(() => {
        const data = [];
        const headlinesTypeOne = document.querySelectorAll("#content .ok-bises-default");
        const headlinesOne = [...headlinesTypeOne];
        if (headlinesOne.length)
            headlinesOne.forEach(headlineObj => {
                data.push({
                    "headline": headlineObj.childNodes[0].childNodes[0].childNodes[0] ? headlineObj.childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
                    "headlineNavigation": headlineObj.childNodes[1].childNodes[1].childNodes[1] ? headlineObj.childNodes[1].childNodes[1].childNodes[1].getAttribute("href") : "missing",
                    "authorName": headlineObj.childNodes[1].childNodes[3].childNodes[1].childNodes[3] ? childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent : "missing"
                });
            });

        const headlinesTypeTwo = document.querySelectorAll("#content .ok-bises-type-2");
        const headlinesTwo = [...headlinesTypeTwo];
        if (headlinesTwo.length)
            headlinesTwo.forEach(headlineObj => {
                data.push({
                    "newsTag":,
                    "headline":,
                    "headlineNavigation":,
                    "authorName":,
                    "mediaSource":,
                    "mediaNavigation:",
                    "headlineSummary":
            });
            });

        return data;
    }).then(() => {
        console.log("front page headlines fetched.")
    }).catch((error) => {
        console.log("error while fetching front page headlines. " + error);
    })

    //*to scrap sports news

    //*to scrap tech news
})();

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.onlinekhabar.com/");

    const frontPageHeadlines = await page.evaluate(() => {
        const data = [];
        const headlinesTypeOne = document.querySelectorAll("#content .ok-bises-default");
        const headlinesOne = [...headlinesTypeOne];
        if (headlinesOne.length) {
            console.log("inside default.")
            headlinesOne.forEach(headlineObj => {
                data.push({
                    "headline": headlineObj.childNodes[0].childNodes[0].childNodes[0] ? headlineObj.childNodes[0].childNodes[0].childNodes[0].textContent : "missing",
                    "headlineNavigation": headlineObj.childNodes[1].childNodes[1].childNodes[1] ? headlineObj.childNodes[1].childNodes[1].childNodes[1].getAttribute("href") : "missing",
                    "authorName": headlineObj.childNodes[1].childNodes[3].childNodes[1].childNodes[3] ? childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent : "missing"
                });
                console.log(data);
            });
        }
        else {
            console.log("outside default");
        }
        const headlinesTypeTwo = document.querySelectorAll("#content .ok-bises-type-2");
        const headlinesTwo = [...headlinesTypeTwo];
        if (headlinesTwo.length) {
            headlinesTwo.forEach(headlineObj => {
                data.push({
                    "newsTag": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? "missing" : headlineObj.childNodes[1].childNodes[1].textContent,
                    "headline": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[1].textContent : headlineObj.childNodes[1].childNodes[3].childNodes[1].textContent || "missing",
                    "headlineNavigation": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[1].childNodes[1].getAttribute("href") : headlineObj.childNodes[1].childNodes[3].childNodes[1].getAttribute("href") || "missing",
                    "authorName": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent : headlineObj.childNodes[1].childNodes[5].childNodes[1].childNodes[3].textContent || "missing",
                    "thumbnailSource": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[5].childNodes[1].childNodes[1].getAttribute("src") : headlineObj.childNodes[1].childNodes[7].childNodes[1].childNodes[1].getAttribute("src") || "missing",
                    "thumbnailNavigation": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[5].childNodes[1].getAttribute("href") : headlineObj.childNodes[1].childNodes[7].childNodes[1].getAttribute("href") || "missing",
                    "headlineSummary": headlineObj.childNodes[1].childNodes[1].tagName === "H2" ? headlineObj.childNodes[1].childNodes[7].textContent : headlineObj.childNodes[1].childNodes[9].textContent || "missing"
                });
                console.log(data);
                // console.log("data is: " + JSON.parse(data));

            });
        }
        return data;
    }).then(() => {
        console.log("front page headlines fetched.")
    }).catch((error) => {
        console.log("error while fetching front page headlines. " + error);
    });
    // console.log("headlines are:" + frontPageHeadlines.length)

    //*to scrap sports news

    //*to scrap tech news

    await browser.close();
})();

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: false });
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
                    "headline": headlineObj.childNodes[1].childNodes[1].childNodes[1] ? headlineObj.childNodes[1].childNodes[1].childNodes[1].textContent : "missing",
                    "headlineNavigation": headlineObj.childNodes[1].childNodes[1].childNodes[1] ? headlineObj.childNodes[1].childNodes[1].childNodes[1].getAttribute("href") : "missing",
                    "authorName": headlineObj.childNodes[1].childNodes[3].childNodes[1].childNodes[3] ? headlineObj.childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent : "missing"
                });
                console.log("data from inside default :", data);
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
        else {
            console.log("outside type-3")
        }
        //* might need letter but okay for now!!!
        // const headlinesTypeThree = document.querySelectorAll(".span-5");
        // console.log(headlinesTypeThree);
        return data;
    }).then(() => {
        console.log("front page headlines fetched.")
    }).catch((error) => {
        console.log("error while fetching front page headlines. " + error);
    });
    // console.log("headlines are:" + frontPageHeadlines.length)

    //*to scrap sports news
    await page.goto("https://www.onlinekhabar.com/sports");
    const sportsHeadlines = await page.evaluate(() => {
        const data = [];
        //* for very first headline
        const mainNews = document.querySelector(".ok-sport-main-news-img");
        if (mainNews) {
            data.push({
                "headline": mainNews.childNodes[1].childNodes[1].getAttribute("alt"),
                "thumbnailSource": mainNews.childNodes[1].childNodes[1].getAttribute("src"),
                "headlineNavigation": mainNews.childNodes[1].getAttribute("href")
            })
            console.log("data from inside main news: ", data)
        } else {
            console.log("outside main news");
        }

        const span5headlines = document.querySelectorAll("#content span-5");
        if (span5headlines) {
            const array = [...span5headlines];
            array.forEach(child => {
                data.push({
                    "headline": child.childNodes[1].childNodes[1].childNodes[3].childNodes[1] ? child.childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent.trim() : "missing",
                    "headlineNavigation": child.childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].getAttribute("href") : "missing",
                    "thumbnailSource": child.childNodes[1].childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
                })
            })
        } else {
            console.log("outside span-5");
        }

        const span3Headlines = document.querySelector("#content .span-3");
        if (span3Headlines) {
            const innerChilds = span3Headlines.childNodes[1].querySelectorAll(":scope >div");
            console.log("inner childs: ", innerChilds);
            innerChilds.forEach(child => {
                data.push({
                    "headline": child.childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].getAttribute("alt").trim() : "missing",
                    "headlineNavigation": child.childNodes[1] ? child.childNodes[1].getAttribute("href") : "missing",
                    "thumbnailSource": child.childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].getAttribute("src") : "missing"
                })
                // console.log("sports: ", data);
            })
        } else {
            console.log("outside span-3");
        }

        const span8Headlines = document.querySelector("#content .span-8");
        if (span8Headlines) {
            data.push({
                "headline": span8Headlines.childNodes[1].childNodes[1].childNodes[3].childNodes[1] ? span8Headlines.childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent.trim() : "missing",
                "headlineNavigation": span8Headlines.childNodes[1].childNodes[1] ? span8Headlines.childNodes[1].childNodes[1].getAttribute("href") : "missing",
                "thumbnailSource": span8Headlines.childNodes[1].childNodes[1].childNodes[1] ? span8Headlines.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
            })
            // console.log("From span 8:", data);
        } else {
            console.log("outside span 8");
        }

        const span4Headlines = document.querySelectorAll("#content .span-4");
        if (span4Headlines) {
            data.push({
                "headline": span4Headlines[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1] ? span4Headlines[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent.trim() : "missing",
                "headlineNavigation": span4Headlines[0].childNodes[1].childNodes[1] ? span4Headlines[0].childNodes[1].childNodes[1].getAttribute("href") : "missing",
                "thumbnailSource": span4Headlines[0].childNodes[1].childNodes[1].childNodes[1] ? span4Headlines[0].childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
            })
            console.log("from span -4: ", data);
        } else {
            console.log("span-4 over.")
        }

        const spotHeadlines = document.querySelector("#content .ok-samachar-spot-news");
        if (spotHeadlines) {
            data.push({
                "headline": spotHeadlines.childNodes[1].childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].childNodes[1].getAttribute("alt") : "missing",
                "headlineNavigation": spotHeadlines.childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].getAttribute("href") : "missing",
                "thumbnailSource": spotHeadlines.childNodes[1].childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
                "headlineSummary": spotHeadlines.childNodes[3].childNodes[3] ? spotHeadlines.childNodes[3].childNodes[3].textContent : "missing"
            })
            console.log("from spot", data);
        } else {
            console.log("span-12 over");
        }

        const span6Headlines = document.querySelectorAll("#content .span-6");
        if (span6Headlines) {
            span6Headlines.forEach(child => {
                data.push({
                    "headline": child.childNodes[1].childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].childNodes[1].getAttribute("alt").trim() : "missing",
                    "headlineNavigation": child.childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].getAttribute("href") : "missing",
                    "thumbnailSource": child.childNodes[1].childNodes[1].childNodes[1] ? child.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
                })
                console.log("from span-6 ", data);
            })
        } else {
            console.log("span-6 over.")
        }
    }).then(() => {
        console.log("OnlineKhabar: sucessfully scraped sports news.")
    }).catch((error => {
        console.log("Error: OnlineKhabar: cannot scrap sports news. ", error)
    }));

    //*to scrap tech news
    // get span - 4 class and your are all set
    await page.goto("https://www.onlinekhabar.com/content/technology-news");
    const techHeadlines = await page.evaluate(() => {
        const data = [];

        const spotHeadlines = document.querySelector("#content .ok-samachar-spot-news");
        if (spotHeadlines) {
            data.push({
                "headline": spotHeadlines.childNodes[1].childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].childNodes[1].getAttribute("alt") : "missing",
                "headlineNavigation": spotHeadlines.childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].getAttribute("href") : "missing",
                "thumbnailSource": spotHeadlines.childNodes[1].childNodes[1].childNodes[1] ? spotHeadlines.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
                "headlineSummary": spotHeadlines.childNodes[3].childNodes[3] ? spotHeadlines.childNodes[3].childNodes[3].textContent : "missing"
            })
            console.log("from spot", data);
        } else {
            console.log("span-12 over");
        }

        const headlines = document.querySelectorAll(".span-4");
        const techHeadlinesArray = [...headlines];
        techHeadlinesArray.forEach(techHeadlinesObj => {

            data.push({
                "headline": techHeadlinesObj.childNodes[1].childNodes[1].childNodes[3].childNodes[1] ? techHeadlinesObj.childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent : "missing",
                "headlineNavigation": techHeadlinesObj.childNodes[1].childNodes[1].childNodes[1] ? techHeadlinesObj.childNodes[1].childNodes[1].childNodes[1].getAttribute("src") : "missing",
                "thumbNailSource": techHeadlinesObj.childNodes[1].childNodes[1] ? techHeadlinesObj.childNodes[1].childNodes[1].getAttribute("href") : "missing"

            })
            console.log("from tech news", data);
        })
    }).then(() => {
        console.log("tech news successfully fetched");
    }).catch((error) => {
        console.log("error while scaprping technews!!! ", error)
    });
    console.log("the headlines are : ", frontPageHeadlines);
    await browser.close();
})();


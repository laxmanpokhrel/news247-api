const puppiter = require('puppeteer');
const save = require("../utils/save");
const fs = require('fs/promises');

module.exports = async function scrapHamroPatro() {
    const scrapFromHamroPatro = 'https://www.hamropatro.com/'
    const browser = await puppiter.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(scrapFromHamroPatro);


    const hamroPatroDateTime = await page.evaluate(() => {
        const data = [];
        data.push({
            nepDate: document.querySelector('.logo .date .nep') ? document.querySelector('.logo .date .nep').textContent.trim() : "missing",
            nepEvent: document.querySelector('.logo .events .event') ? document.querySelector('.logo .events .event').textContent.trim() : "missing",
            scrappedNepalTime: document.querySelector('.logo .time span') ? document.querySelector('.logo .time span').textContent.trim() : "missing",
            engDate: document.querySelector('.logo .time .eng') ? document.querySelector('.logo .time .eng').textContent.trim() : "missing",
        })
        // console.log(data);
        return JSON.stringify(data);

    }).then((result) => {
        console.log("from then: ", result);
        save.saveHamroPatroDate(result);
    }).catch(error => {
        console.log("Error: HamroPatro: ", error);
    })
    // console.log(hamroPatroDateTime)
    await browser.close()
}

// scrapHamroPatro()

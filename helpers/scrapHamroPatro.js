const puppiter = require('puppeteer')
const fs = require('fs/promises')

async function scrapHamroPatro() {
    const scrapFromHamroPatro = 'https://www.hamropatro.com/'
    const browser = await puppiter.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(scrapFromHamroPatro)

    const result = await page.evaluate(() => {
        const data = [];
        data.push({
            nepDate: document.querySelector('.logo .date .nep') ? document.querySelector('.logo .date .nep').textContent : "missing",
            nepEvent: "missing",
            scrappedNepalTime: document.querySelector('.logo .time span') ? document.querySelector('.logo .time span').textContent : "missing",
            engDate: document.querySelector('.logo .time .eng') ? document.querySelector('.logo .time .eng').textContent : "missing",
        })
        console.log(data);
        return (
            data.push({
                nepDate: document.querySelector('.logo .date .nep') ? document.querySelector('.logo .date .nep').textContent.trim() : "missing",
                nepEvent: document.querySelector('.logo .events').isEmpty() ? document.querySelector('.logo .events').textContent.trim() : "missing",
                scrappedNepalTime: document.querySelector('.logo .time span') ? document.querySelector('.logo .time span').textContent.trim() : "missing",
                engDate: document.querySelector('.logo .time .eng') ? document.querySelector('.logo .time .eng').textContent.trim() : "missing",
            })
        )


    }).then(() => {
        console.log("Hamro patro: Fetched.")
    }).catch(error => {
        console.log("Error: HamroPatro: ", error);
    })
    console.log(result)
    // await browser.close()
}

scrapHamroPatro()

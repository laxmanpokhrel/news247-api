const puppiter = require('puppeteer')
const fs = require('fs/promises')

async function scrapHamroPatro() {
    const scrapFromHamroPatro = 'https://www.hamropatro.com/'
    const browser = await puppiter.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(scrapFromHamroPatro)

    const result = await page.evaluate(() => {
        const nepDate = document.querySelector('.logo .date .nep').textContent
        console.log('Nepali event: ' + nepEvent)
        const scrappedNepalTime =
            document.querySelector('.logo .time span').textContent || 'not available'
        const engDate =
            document.querySelector('.logo .time .eng').textContent || 'not available'
        return {
            source: 'hamropatro',
            data: {
                nepDate: document.querySelector('.logo .date .nep') ? document.querySelector('.logo .date .nep').textContent : "missing",
                nepEvent: "missing",
                scrappedNepalTime: document.querySelector('.logo .time span') ? document.querySelector('.logo .time span').textContent : "missing",
                engDate: document.querySelector('.logo .time .eng') ? document.querySelector('.logo .time .eng').textContent : "missing",
            },
        }
    })
    console.log(result)
    await browser.close()
}

scrapHamroPatro()

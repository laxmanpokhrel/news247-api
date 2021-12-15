const puppiter = require('puppeteer')
const fs = require('fs/promises')

async function scrapHamroPatro() {
  const scrapFromHamroPatro = 'https://www.hamropatro.com/'
  const browser = await puppiter.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(scrapFromHamroPatro)

  const result = await page.evaluate(() => {
    const nepDate = document.querySelector('.logo .date .nep').textContent
    // const nepEvent =
    //   document.querySelector(".logo .events .event").textContent ||
    //   "not available";
    console.log('Nepali event: ' + nepEvent)
    const scrappedNepalTime =
      document.querySelector('.logo .time span').textContent || 'not available'
    const engDate =
      document.querySelector('.logo .time .eng').textContent || 'not available'
    return {
      source: 'hamropatro',
      data: {
        nepDate: nepDate,
        nepEvent: nepEvent,
        scrappedNepalTime: scrappedNepalTime,
        engDate: engDate,
      },
    }
  })
  console.log(result)
  await browser.close()
}

scrapHamroPatro()

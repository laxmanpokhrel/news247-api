"use strict";

var puppiter = require('puppeteer');

var fs = require('fs/promises');

function scrapHamroPatro() {
  var scrapFromHamroPatro, browser, page, result;
  return regeneratorRuntime.async(function scrapHamroPatro$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          scrapFromHamroPatro = 'https://www.hamropatro.com/';
          _context.next = 3;
          return regeneratorRuntime.awrap(puppiter.launch({
            headless: true
          }));

        case 3:
          browser = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(browser.newPage());

        case 6:
          page = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(page["goto"](scrapFromHamroPatro));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            var nepDate = document.querySelector('.logo .date .nep').textContent; // const nepEvent =
            //   document.querySelector(".logo .events .event").textContent ||
            //   "not available";

            console.log('Nepali event: ' + nepEvent);
            var scrappedNepalTime = document.querySelector('.logo .time span').textContent || 'not available';
            var engDate = document.querySelector('.logo .time .eng').textContent || 'not available';
            return {
              source: 'hamropatro',
              data: {
                nepDate: nepDate,
                nepEvent: nepEvent,
                scrappedNepalTime: scrappedNepalTime,
                engDate: engDate
              }
            };
          }));

        case 11:
          result = _context.sent;
          console.log(result);
          _context.next = 15;
          return regeneratorRuntime.awrap(browser.close());

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

scrapHamroPatro();
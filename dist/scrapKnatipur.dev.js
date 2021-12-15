"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('fs'),
    copyFile = _require.copyFile;

var puppeteer = require('puppeteer');

(function _callee() {
  var browser, page, frontPageHeadlines, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: true
          }));

        case 2:
          browser = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(page["goto"]('https://ekantipur.com/'));

        case 8:
          frontPageHeadlines = [];
          _context.next = 11;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            var articles = document.querySelectorAll('.main-news > article');

            var articlesArray = _toConsumableArray(articles); // const newsKiker =
            //   articlesArray[0].childNodes[4].childNodes[0].textContent.trim();
            // const heading =
            //   articlesArray[0].childNodes[6].childNodes[0].textContent.trim();
            // const headingNav =
            //   articlesArray[0].childNodes[6].childNodes[0].getAttribute("href");
            // const mediaNav =
            //   articlesArray[0].childNodes[7].childNodes[0].childNodes[0].getAttribute(
            //     "href"
            //   );
            // const mediaSrc =
            //   articlesArray[0].childNodes[7].childNodes[0].childNodes[0].childNodes[0].getAttribute(
            //     "src"
            //   );


            for (article in articlesArray) {
              var newsKiker = article.childNodes[4].childNodes[0].textContent.trim();
              var heading = article.childNodes[6].childNodes[0].textContent.trim();
              var headingNav = article.childNodes[6].childNodes[0].getAttribute('href');
              var mediaNav = article.childNodes[7].childNodes[0].childNodes[0].getAttribute('href');
              var mediaSrc = article.childNodes[7].childNodes[0].childNodes[0].childNodes[0].getAttribute('src');
              frontPageHeadlines.push({
                newsKiker: newsKiker,
                heading: heading,
                headingNavigation: headingNav,
                mediaNavigation: mediaNav,
                mediaSource: mediaSrc
              });
            }

            return [{
              source: 'ekantipur.com',
              frontPageHeadlines: frontPageHeadlines
            }];
          }).then()["catch"]());

        case 11:
          result = _context.sent;
          console.log('result:', result);
          _context.next = 15;
          return regeneratorRuntime.awrap(browser.close());

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
})();
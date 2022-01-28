const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server2}list-genre/`);
    const $ = cheerio.load(html);
    const results = $(".list-genre a")
      .map(function () {
        return {
          link: $(this).attr("href"),
          text: $(this).text(),
          abjad: $(this).text().charAt(0),
        };
      })
      .get();

    const data = groupBy(results, "abjad");

    return {
      source: server2,
      data,
    };
  } catch (error) {
    return { source: server2, data: null };
  }
};

module.exports = dataServer2;

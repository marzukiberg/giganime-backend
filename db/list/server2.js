const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server2}anime-list/`);
    const $ = cheerio.load(html);
    const results = $(".anime-list li")
      .map(function () {
        return {
          link: $(this).find("a").attr("href").replace("/anime/", "/series/"),
          text: $(this).find("a").text(),
          abjad: $(this).find("a").text().charAt(0).replace(/^\d+$/, "#"),
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

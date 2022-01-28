const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server3}a-z/`);
    console.log(html);
    const $ = cheerio.load(html);
    let results = $("article .item")
      .map(function () {
        return {
          link: $(this)
            .find(".info a")
            .attr("href")
            .replace(server3 + "anime/", "/series/"),
          text: $(this).find(".info a").text(),
          abjad: $(this).find(".info a").text().charAt(0),
        };
      })
      .get();
    const data = groupBy(results, "abjad");

    return {
      source: server3,
      data,
    };
  } catch (error) {
    return { source: server3, data: null };
  }
};

module.exports = dataServer3;

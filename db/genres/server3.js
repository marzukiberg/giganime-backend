const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server3}a-z/`);
    const $ = cheerio.load(html);
    const results = $("ul.genre li")
      .map(function () {
        return {
          link: $(this)
            .find("a")
            .attr("href")
            .replace(server3 + "genre/", "/genres/"),
          text: $(this).find("a").get(0).children[0].data,
          abjad: $(this).find("a").get(0).children[0].data.charAt(0),
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

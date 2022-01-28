const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server1}daftar-anime/?list`);
    const $ = cheerio.load(html);
    const results = $(".listbar")
      .map(function () {
        return $(this)
          .find("ul li")
          .map(function () {
            return {
              link: $(this)
                .find("a")
                .attr("href")
                .replace(server1 + "anime/", "/series/"),
              text: $(this).find("a").text(),
              abjad: $(this).find("a").text().charAt(0).replace(/^\d+$/, "#"),
            };
          })
          .get();
      })
      .get();

    const data = groupBy(results, "abjad");

    return {
      source: server1,
      data,
    };
  } catch (error) {
    return { source: server1, data: null };
  }
};

module.exports = dataServer1;

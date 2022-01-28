const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (path) => {
  try {
    const html = await cloudscraper.get(server1);
    const $ = cheerio.load(html);
    const results = $("ul.genre li")
      .map(function () {
        if (
          $(this).find("a").attr("href") !==
          "https://animeindo.one/genre/styledisplay-nonemusic/"
        ) {
          return {
            // abjad: $(this).find(".listabj").text(),
            link: $(this)
              .find("a")
              .attr("href")
              .replace(server1 + "genre/", "/genres/"),
            text: $(this).find("a").get(0).children[0].data,
            abjad: $(this).find("a").get(0).children[0].data.charAt(0),
          };
        }
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

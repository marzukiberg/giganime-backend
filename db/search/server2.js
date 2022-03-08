const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (s, p) => {
  try {
    const url =
      p !== 1 ? server2 + `page/${p}/search/${s}/` : server2 + `search/${s}/`;
    const html = await cloudscraper.get(url);
    const $ = cheerio.load(html);
    const data = $("table.otable")
      .map(function () {
        return {
          title: $(this).find("a").text().trim(),
          img: server2.slice(0, -1) + $(this).find("img").attr("src"),
          type: $(this)
            .find(".label")
            .map(function () {
              return $(this).text().trim();
            })
            .get(),
          rating: $(this).find(".score").text().trim(),
          link: $(this).find("a").attr("href").replace("/anime/", "/series/"),
        };
      })
      .get();

    return {
      source: server2,
      data,
    };
  } catch (error) {
    return { source: server2, data: null };
  }
};

module.exports = dataServer2;

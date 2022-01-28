const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server2}anime/${path}/`);
    const $ = cheerio.load(html);
    const content = $(".detail")
      .map(function () {
        return {
          title: $(this).find("h2").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".info-content span")
            .map(function () {
              return $(this).text();
            })
            .get(),
          thumb: server2.slice(0, -1) + $(this).find("img").attr("src"),
          rating: $(this).find(".rating strong").text(),
          tags: $(this)
            .find("li")
            .map(function () {
              return $(this).text();
            })
            .get(),
          desc: $(this).find("p").text().trim(),
        };
      })
      .get(0);

    const episodeList = $(".ep a")
      .map(function () {
        return {
          title: $(this).text().trim(),
          link: `/anime${$(this).attr("href")}`,
        };
      })
      .get();

    return {
      source: server2,
      content,
      episodeList,
    };
  } catch (error) {
    return { source: server2, content: null };
  }
};

module.exports = dataServer2;

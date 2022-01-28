const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (path) => {
  try {
    const html = await cloudscraper.get(server2 + path);
    const $ = cheerio.load(html);
    const data = $(".nganan table")
      .map(function () {
        return {
          source: server2,
          path: $(this).find("a").attr("href").replace("/anime/", "/series/"),
          title: $(this).find(".zvidesc a").text().trim(),
          img: server2.slice(0, -1) + $(this).find("img").attr("src"),
          eps: "",
          tags: $(this).find(".zvidesc").text().trim().split("\n")[1],
        };
      })
      .get();

    const pagination = $(".pag")
      .map(function () {
        return {
          current: $(this).find(".cur").text(),
          prev: $(this)
            .find("a:contains(«)")
            .attr("href")
            ?.match(/\d/g)
            ?.join(""),
          next: $(this)
            .find("a:contains(»)")
            .attr("href")
            ?.match(/\d/g)
            ?.join(""),
          links: $(this)
            .find("a")
            .not(":contains(«)")
            .not(":contains(»)")
            .map(function () {
              return {
                link: $(this).attr("href")?.match(/\d/g)?.join(""),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server2, pagination, data };
  } catch (error) {
    return { source: server2, data: [] };
  }
};

module.exports = dataServer2;

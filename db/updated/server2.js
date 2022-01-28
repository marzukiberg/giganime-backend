const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (path) => {
  try {
    const html = await cloudscraper.get(server2 + path);
    const $ = cheerio.load(html);
    const data = $(".list-anime")
      .map(function () {
        return {
          path: "/anime" + $(this).parent().get(0).attribs?.href,
          title: $(this).find("p").text(),
          img: $(this).find("img").attr("data-original"),
          eps: $(this).find(".eps").text(),
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

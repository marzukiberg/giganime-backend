const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (path) => {
  try {
    const html = await cloudscraper.get(server3 + path);
    const $ = cheerio.load(html);
    const data = $(".post-show")
      .map(function (idx) {
        if (idx === 0) {
          const list = $(this)
            .find("li")
            .map(function () {
              return {
                path:
                  "/anime" +
                  $(this).find(".thumb a").attr("href").replace(server3, "/"),
                title: $(this).find("h2.entry-title").text(),
                img: $(this).find(".thumb img").attr("src"),
                eps: $(this)
                  .find(".dtla span")
                  .map(function () {
                    return $(this).text().trim();
                  })
                  .get(0),
              };
            })
            .get();
          return list;
        }
      })
      .get();

    const pagination = $(".pagination")
      .map(function () {
        return {
          current: $(this).find(".current").text(),
          prev: $(this)
            .find("a.arrow_pag")
            .has("#prevpagination")
            .attr("href")
            ?.replace(server3, "")
            ?.match(/\d/g)
            ?.join(""),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            ?.replace(server3, "")
            ?.match(/\d/g)
            ?.join(""),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
            .map(function () {
              return {
                link: $(this)
                  .attr("href")
                  ?.replace(server3, "")
                  ?.match(/\d/g)
                  ?.join(""),
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get(0);

    return { source: server3, pagination, data };
  } catch (error) {
    return { source: server3, data: [] };
  }
};

module.exports = dataServer3;

const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (path) => {
  try {
    const html = await cloudscraper.get(server3 + path);
    const $ = cheerio.load(html);
    const data = $(".widgets li")
      .map(function (idx) {
        return {
          source: server3,
          path: $(this)
            .find("a")
            .attr("href")
            .replace(server3 + "anime/", "/series/"),
          title: $(this).find("h2 a").text(),
          img: $(this).find("img").attr("src"),
          eps: $(this).find(".data .episode").text(),
          tags: $(this)
            .find(".lftinfo span a")
            .map(function () {
              return $(this).text();
            })
            .get(),
          type: $(this).find(".data .type").text(),
        };
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

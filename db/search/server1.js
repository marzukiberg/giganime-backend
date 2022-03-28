const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (sq, page) => {
  try {
    const url =
      page !== 1 ? server1 + `page/${page}/?s=${sq}` : server1 + `?s=${sq}`;
    const html = await cloudscraper.get(url);
    const $ = cheerio.load(html);
    const data = $(".animposx")
      .map(function () {
        return {
          title: $(this).find(".title").text(),
          img: $(this).find("img").attr("src"),
          type: $(this).find(".type").first().text(),
          rating: $(this).find(".score").text().trim(),
          link: $(this)
            .find("a")
            .attr("href")
            .replace(server1 + "anime/", "/series/"),
        };
      })
      .get();

    const pagination = $(".pagination")
      .map(function () {
        return {
          current: $(this).find(".current").text(),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
            .map(function () {
              return {
                link: $(this).attr("href").match(/\d+/g)[0],
                text: $(this).text(),
              };
            })
            .get(),
        };
      })
      .get();

    return {
      source: server1,
      data,
      pagination,
    };
  } catch (error) {
    return { source: server1, data: null };
  }
};

module.exports = dataServer1;

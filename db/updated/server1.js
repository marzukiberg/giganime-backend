const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (path) => {
  try {
    const html = await cloudscraper.get(server1 + "anime-terbaru/" + path);
    const $ = cheerio.load(html);
    const data = $(".animepost")
      .map(function () {
        const link = $(this).find("a").attr("href").split("/");
        return {
          path: "/anime/" + link[link.length - 2] + "/",
          title: $(this).find(".dataver2 .title").text(),
          img: $(this).find("img").attr("src"),
          eps: $(this).find(".data .episode").text(),
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
            ?.match(/\d/g)
            ?.join(""),
          next: $(this)
            .find("a.arrow_pag")
            .has("#nextpagination")
            .attr("href")
            ?.match(/\d/g)
            ?.join(""),
          links: $(this)
            .find("a")
            .not(".arrow_pag")
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

    return { source: server1, pagination, data };
  } catch (error) {
    return { source: server1, data: [] };
  }
};

module.exports = dataServer1;

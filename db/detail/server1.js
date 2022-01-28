const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (slug) => {
  try {
    const html = await cloudscraper.get(server1 + slug + "/");
    const $ = cheerio.load(html);
    const downloads = $(".links_table tr")
      .map(function (idx) {
        if (idx !== 0) {
          return {
            link: $(this).find("td a").attr("href"),
            quality: $(this).find("td .quality").text(),
            size: $(this).find("td").get(2).children[0]?.data,
          };
        }
      })
      .get();

    const data = $("main")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          img: $(this).find(".infoanime img").attr("src"),
          eps: $(this).find(".epx").text().split("\n")[0],
          desc: $(this).find(".desc .entry-content").text().trim(),
          tags: $(this).find(".infox .alternati").text().trim().split("\n"),
          downloads,
          navigation: {
            before: `/anime/${
              $(this)
                .find(".naveps .nvs a")[0]
                .attribs.href?.split("/")
                .reverse()[1]
            }/`,
            all: `/series/${
              $(this)
                .find(".naveps .nvs a")[1]
                .attribs.href?.split("/")
                .reverse()[1]
            }/`,
            next: `/anime/${
              $(this)
                .find(".naveps .nvs a")[2]
                .attribs.href?.split("/")
                .reverse()[1]
            }/`,
          },
          iframeSrc: $(this).find("#player_embed iframe").attr("src"),
        };
      })
      .get(0);

    return {
      source: server1,
      data,
    };
  } catch (error) {
    return { source: server1, data: null };
  }
};

module.exports = dataServer1;

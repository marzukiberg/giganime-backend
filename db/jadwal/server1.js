const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server1}jadwal/${path}`);
    const $ = cheerio.load(html);
    const data = $(".result-schedule")
      .map(function () {
        return {
          day: $(this).prev().text().trim(),
          lists: $(this)
            .find(".schedule_list")
            .map(function () {
              return {
                title: $(this).find(".title").text().trim(),
                genres: $(this).find(".gnrx").text().split(" / "),
                path: `/series/${$(this).find("a").attr("href")}`.replace(
                  server1 + "anime/",
                  ""
                ),
                img: $(this).find("img").attr("src").split("?")[0],
              };
            })
            .get(),
        };
      })
      .get();

    return {
      source: server1,
      data,
    };
  } catch (error) {
    return { source: server1, data: null };
  }
};

module.exports = dataServer1;

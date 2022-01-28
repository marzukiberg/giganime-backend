const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server1 } = require("../../utils/constants");

const dataServer1 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server1}anime/${path}/`);
    const $ = cheerio.load(html);
    const content = $(".bigcontent")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".info-content span")
            .map(function () {
              return $(this).text();
            })
            .get(),
          thumb: $(this).find(".thumb img").attr("src"),
          rating: $(this).find(".rating strong").text(),
          tags: $(this)
            .find(".genxed a")
            .map(function () {
              return $(this).text();
            })
            .get(),
        };
      })
      .get(0);
    const desc = $(".entry-content p").text().trim();
    const episodeList = $(".lsteps li")
      .map(function () {
        return {
          title: $(this)
            .find("a")
            .get(1)
            ?.children[0].data.replace("Episode ", ""),
          link: `/anime/${
            $(this).find("a").attr("href").split("/").reverse()[1]
          }/`,
        };
      })
      .get();

    return {
      source: server1,
      content: { ...content, desc },
      episodeList: episodeList.reverse(),
    };
  } catch (error) {
    return { source: server1, content: null };
  }
};

module.exports = dataServer1;

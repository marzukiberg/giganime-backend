const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (s, p) => {
  try {
    const url =
      p !== 1 ? server3 + `page/${p}/search/${s}` : server3 + `?s=${s}`;
    console.log(url);
    const html = await cloudscraper.get(url);
    const $ = cheerio.load(html);
    const data = $(".animposx")
      .map(function () {
        return {
          title: $(this).find(".title").text().trim(),
          img: $(this).find("img").attr("src"),
          type: $(this).find(".type").first().text().trim(),
          rating: $(this).find(".score").text().trim(),
          link: $(this)
            .find("a")
            .attr("href")
            .replace(server3 + "anime/", "/series/"),
        };
      })
      .get();

    return {
      source: server3,
      data,
    };
  } catch (error) {
    return { source: server3, data: null };
  }
};

module.exports = dataServer3;

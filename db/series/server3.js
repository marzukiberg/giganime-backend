const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (path) => {
  try {
    const html = await cloudscraper.get(`${server3}anime/${path}/`);
    const $ = cheerio.load(html);
    const content = $(".post-body")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          keywords: $(this).find(".mindesc").text().trim(),
          infoContent: $(this)
            .find(".infox span")
            .map(function () {
              return (
                $(this).text().split(" ")[0] +
                ": " +
                $(this).text().split(" ").slice(1).join(" ")
              );
            })
            .get(),
          thumb: $(this).find("img").attr("src"),
          rating: $(this).find(".rating-area [itemprop=ratingValue]").text(),
          tags: $(this)
            .find(".genre-info a")
            .map(function () {
              return $(this).text();
            })
            .get(),
          desc: $(this).find(".desc").text().trim(),
        };
      })
      .get(0);

    const episodeList = $(".listeps li")
      .map(function () {
        return {
          title: $(this)
            .find("a")
            .map(function () {
              return $(this).text();
            })
            .get(1),
          link: `/anime${$(this).find("a").attr("href").replace(server3, "/")}`,
        };
      })
      .get();

    return { source: server3, content, episodeList };
  } catch (error) {
    return { source: server3, content: null };
  }
};

module.exports = dataServer3;

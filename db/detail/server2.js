const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { server2 } = require("../../utils/constants");

const dataServer2 = async (slug) => {
  try {
    const html = await cloudscraper.get(`${server2 + slug}/`);
    const $ = cheerio.load(html);

    const data = $(".ngiri")
      .map(function () {
        return {
          mainSource: server2,
          title: $(this).find("h1.title").text(),
          img: server2.slice(0, -1) + $(this).find(".detail img").attr("src"),
          eps: "",
          desc: $(this).find(".detail p").text().trim(),
          tags: [],
          iframeSrc: $(this).find("iframe").attr("src"),
        };
      })
      .get(0);

    return {
      source: server2,
      data,
    };
  } catch (error) {
    return { source: server2, data: null };
  }
};

module.exports = dataServer2;

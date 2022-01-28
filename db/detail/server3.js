const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const { groupBy } = require("../../utils/arr-utils");
const { server3 } = require("../../utils/constants");

const dataServer3 = async (slug) => {
  try {
    const html = await cloudscraper.get(`${server3 + slug}/`);
    const $ = cheerio.load(html);
    const downloads = $(".download-eps li")
      .map(function () {
        const type =
          $(this).parent().parent().get(0).children[0].children[0].children[0]
            .data || "";
        return {
          link: $(this).find("a").attr("href"),
          quality: $(this).find("strong").text().trim(),
          size: "-",
          type,
        };
      })
      .get();
    const data = $("article")
      .map(function () {
        return {
          title: $(this).find("h1.entry-title").text(),
          img: $(this).find(".thumb img").attr("src"),
          eps: `Episode ${$(this).find("span[itemprop=episodeNumber]").text()}`,
          desc: $(this).find(".entry-content").text().trim(),
          tags: [],
          iframeSrc: false,
          downloads,
        };
      })
      .get(0);

    return {
      source: server3,
      data,
    };
  } catch (error) {
    return { source: server3, data: null };
  }
};

module.exports = dataServer3;

const express = require("express");
const getByQuery = require("../db/search");
const getUpdated = require("../db/updated");
const router = express.Router();

router.get("/", async (req, res) => {
  const { s, p = 1 } = req.query;

  const searchResult = await getByQuery(s, p);
  res.send(searchResult);

  const data = await getUpdated();
  res.send(data);
});

router.get("/page/:num", async (req, res) => {
  const { num: page } = req.params;
  const data = await getUpdated(`page/${page}`);
  res.send(data);
});

module.exports = router;

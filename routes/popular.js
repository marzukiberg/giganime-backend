const express = require("express");
const getPopular = require("../db/popular");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getPopular();
  res.send(data);
});

router.get("/page/:num", async (req, res) => {
  const { num: page } = req.params;
  const data = await getPopular(`page/${page}`);
  res.send(data);
});

module.exports = router;

const express = require("express");
const getSeries = require("../db/series");
const router = express.Router();

router.get("/:path", async (req, res) => {
  const { path } = req.params;
  const data = await getSeries(path);
  res.send(data);
});

module.exports = router;

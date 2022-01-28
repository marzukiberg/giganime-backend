const express = require("express");
const getDetail = require("../db/detail");
const router = express.Router();

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = await getDetail(slug);
  res.send(data);
});

module.exports = router;

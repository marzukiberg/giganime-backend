const express = require("express");
const getGenres = require("../db/genres");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getGenres();
  res.send(data);
});

module.exports = router;

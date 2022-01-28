const express = require("express");
const getList = require("../db/list");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getList();
  res.send(data);
});

module.exports = router;

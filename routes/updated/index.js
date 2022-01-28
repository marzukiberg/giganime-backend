const express = require("express");
const getUpdated = require("../../db/updated");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getUpdated();
  res.send(data);
});

module.exports = router;

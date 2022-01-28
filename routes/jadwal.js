const express = require("express");
const getJadwal = require("../db/jadwal");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getJadwal();
  res.send(data);
});

module.exports = router;

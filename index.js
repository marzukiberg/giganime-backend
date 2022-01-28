const express = require("express");
const cors = require("cors");
const app = express();
const updateRouter = require("./routes/updated");
const popularRouter = require("./routes/popular");
const seriesRouter = require("./routes/series");
const jadwalRouter = require("./routes/jadwal");
const genresRouter = require("./routes/genres");
const listRouter = require("./routes/list");
const animeRouter = require("./routes/anime");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", updateRouter);
app.use("/updated", updateRouter);
app.use("/popular", popularRouter);
app.use("/series", seriesRouter);
app.use("/jadwal", jadwalRouter);
app.use("/genres", genresRouter);
app.use("/list", listRouter);
app.use("/anime", animeRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

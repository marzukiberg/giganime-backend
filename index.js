const express = require("express");
const cors = require("cors");
const app = express();
const updateRouter = require("./routes/updated");
const popularRouter = require("./routes/popular");
const seriesRouter = require("./routes/series");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", updateRouter);
app.use("/updated", updateRouter);
app.use("/popular", popularRouter);
app.use("/series", seriesRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

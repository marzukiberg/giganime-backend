const express = require("express");
const cors = require("cors");
const app = express();
const updateRouter = require("./routes/updated");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", updateRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

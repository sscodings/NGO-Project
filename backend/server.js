const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const MainRouter = require("./routes/index");

app.use("/",MainRouter);

app.listen(3000);

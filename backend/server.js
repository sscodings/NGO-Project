const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const MainRouter = require("./routes/index");

app.use("/", MainRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

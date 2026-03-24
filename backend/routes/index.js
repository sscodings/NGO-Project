const express = require("express");
const organisationRouter = require("./organisation");

const router = express.Router();

router.use("/organistaion",organisationRouter);

module.exports = router;
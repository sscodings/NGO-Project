const express = require("express");
const organisationRouter = require("./organisation");
const userRouter = require("./User");

const router = express.Router();

router.use("/organistaion",organisationRouter);
router.use("/user",userRouter);

module.exports = router;
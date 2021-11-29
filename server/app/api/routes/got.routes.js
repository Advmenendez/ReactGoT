
const express = require("express");

const router = express.Router();

const { isAuth } = require("../../middlewares/auth.middleware")


const { getAllGots, getGotById } = require("../controllers/got.controller");

router.get("/", [isAuth], getAllGots);
router.get("/:gotId", getGotById);

module.exports = router;

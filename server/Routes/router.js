const express = require("express");
const router = express.Router();
const signUpHandler = require("../Controllers/signUpHandler");

router.post("/signUp", signUpHandler);

module.exports = router;

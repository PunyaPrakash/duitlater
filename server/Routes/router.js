const express = require("express");
const signUpHandler = require("../Controllers/signUpHandler");
const handleSignIn = require("../Controllers/signInHandler");

const router = express.Router();

router.post("/signUp", signUpHandler);
router.post("/signin", handleSignIn);

module.exports = router;

const express = require("express");

const router = express.Router();
// const expressJwt = require("express-jwt");

//import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { read, update } = require("../controllers/user");

//import validators
router.get("/user/:id", requireSignin, read);
// router.post("/user/:id", requireSignin, read);
router.put("/user/update", requireSignin, update);
router.put("/admin/update", requireSignin, adminMiddleware, update);

module.exports = router;

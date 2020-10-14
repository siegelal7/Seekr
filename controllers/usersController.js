const express = require("express");
const router = express.Router();
const db = require("../models");
// const passport = require("../config/passport");






//========================API ROUTES==============================
// Returns all users
router.get("/api/users", (req, res) => {
    db.User.findAll().then(dbUser => res.json(dbUser));
});

router.post("/api/signup", (req, res) => {
    db.User.create(req.body).then(dbUser => res.json(dbUser));
});

module.exports = router;
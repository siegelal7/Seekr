const express = require("express");
const router = express.Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

//========================VIEW ROUTES============================
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/job-board", isAuthenticated, (req, res) => {
  db.Job.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(function (data) {
    res.render("job_board", { jobs: data });
  });
});

//========================API ROUTES==============================
// Returns all job cards
router.get("/api/jobs", (req, res) => {
  db.Job.findAll().then((dbJob) => res.json(dbJob));
});

// Creates job
router.post("/api/job", (req, res) => {
  db.Job.create(req.body).then((dbJob) => res.json(dbJob));
});

// Delete job by id
router.delete("/api/job/:id", (req, res) => {
  db.Job.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbJob) => res.json(dbJob));
});

// Update job details by id
router.put("/api/job/", (req, res) => {
  db.Job.update(req.body, {
    where: {
      id: req.body.id,
    },
  }).then((dbJob) => res.json(dbJob));
});

module.exports = router;

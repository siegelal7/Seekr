const express = require("express");
const router = express.Router();
const db = require("../models");
// var Plotly = require("/assets/js/stats.js");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { sequelize } = require("../models");

//========================VIEW ROUTES============================
router.get("/", (req, res) => {
  res.render("index", { style: "style.css" });
});

router.get("/job-board", isAuthenticated, (req, res) => {
  db.Job.findAll({
    where: {
      UserId: req.user.id,
    },
  }).then(function (data) {
    res.render("job_board", { jobs: data, style: "style.css" });
  });
});

router.get("/favorites", isAuthenticated, (req, res) => {
  db.Job.findAll({
    where: {
      UserId: req.user.id,
      starred: 1,
    },
  }).then(function (data) {
    // console.log(data[0].dataValues);
    // var test = await determineStage(data);
    // console.log("TESST " + test);
    res.render("favorites", { jobs: data, style: "style.css" });
  });
});

router.get("/stats", isAuthenticated, (req, res) => {
  db.Job.findAll({
    where: {
      UserId: req.user.id,
    },
  }).then(async function (data) {
    // console.log(data[0].dataValues);
    var yData = await determineStage(data);

    // console.log("TESST " + test);
    res.render("statistics", { jobs: yData, style: "stats.css" });
  });
});

router.get("/about-us", (req, res) => {
  res.render("about_us", { style: "about-us.css" });
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

// API for retrieving job stages data and manipulating the data
router.get("/api/ydata", isAuthenticated, (req, res) => {
  db.Job.findAll({
    where: {
      UserId: req.user.id,
    },
  }).then(async function (data) {
    // console.log(data[0].dataValues);
    var yData = await determineStage(data);

    // console.log("TESST " + test);
    res.json(yData);
  });
});

//General API for retrieving job by user id
router.get("/api/userAuthJobs", isAuthenticated, (req, res) => {
  db.Job.findAll({
    attributes: [
      "id",
      "jobName",
      "company",
      "stage",
      "starred",
      [
        sequelize.fn("date_format", sequelize.col("createdAt"), "%Y-%m-%d"),
        "createdAt_formatted",
      ],
    ],
    where: {
      UserId: req.user.id,
    },
  }).then((dbJobs) => res.json(dbJobs));
});

// API for retrieving job by job id
router.get("/api/job/:id", isAuthenticated, (req,res) => {
  db.Job.findOne({
    where: {
      id: req.params.id
    }
  }).then(job => res.json(job));
});


//TODO: MOVE TO SEPERATE FILE
// Function for determining stage of jobs before sending to stats handlebars
async function determineStage(data) {
  return new Promise((resolve, rej) => {
    var obj = {
      planningToApply: [],
      applied: [],
      phone: [],
      onSite: [],
      offers: [],
      rejected: [],
    };
    var yData = [];
    // yData.push(2)
    for (let i = 0; i < data.length; i++) {
      if (data[i].dataValues.stage == "Planning to Apply") {
        // console.log("planning");
        obj.planningToApply.push(data[i].dataValues.jobName);
      } else if (data[i].dataValues.stage == "Applied") {
        // console.log("applied");
        obj.applied.push(data[i].dataValues.jobName);
      } else if (data[i].dataValues.stage == "Phone Screen") {
        // console.log("phone");
        obj.phone.push(data[i].dataValues.jobName);
      } else if (data[i].dataValues.stage == "On Site") {
        // console.log("onsite");
        obj.onSite.push(data[i].dataValues.jobName);
      } else if (data[i].dataValues.stage == "Offers") {
        // console.log("offer");
        obj.offers.push(data[i].dataValues.jobName);
      } else if (data[i].dataValues.stage == "Rejected") {
        // console.log("reject");
        obj.rejected.push(data[i].dataValues.jobName);
      }
    }
    yData.push(obj.planningToApply.length);
    yData.push(obj.applied.length);
    yData.push(obj.phone.length);
    yData.push(obj.onSite.length);
    yData.push(obj.offers.length);
    yData.push(obj.rejected.length);
    // console.log(yData);
    resolve(yData);
  });
}

module.exports = router;

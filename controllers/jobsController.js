const express = require("express");
const router = express.Router();
const db = require("../models");

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

//FIXME:
// router.get("/stats", isAuthenticated, (req, res) => {
//   db.Job.findAll({
//     where: {
//       UserId: req.user.id,
//     },
//   }).then(async function (data) {
//     // console.log(data[0].dataValues);
//     var test = await determineStage(data);
//     // console.log("TESST " + test);
//     res.render("statistics", { jobs: test, style: "style.css" });
//   });
// });

// async function determineStage(data) {
//   return new Promise((res, rej) => {
//     var obj = {
//       planningToApply: [],
//       applied: [],
//       phone: [],
//       onSite: [],
//       offers: [],
//       rejected: [],
//     };
//     // var planningArr = [];
//     // var appliedArr = [];
//     // var phoneArr = [];
//     // var onSiteArr = [];
//     // var offersArr = [];
//     // var rejectedArr = [];
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].dataValues.stage == "Planning to Apply") {
//         // console.log("planning");
//         obj.planningToApply.push(data[i].dataValues.jobName);
//       } else if (data[i].dataValues.stage == "Applied") {
//         // console.log("applied");
//         obj.applied.push(data[i].dataValues.jobName);
//       } else if (data[i].dataValues.stage == "Phone Screen") {
//         // console.log("phone");
//         obj.phone.push(data[i].dataValues.jobName);
//       } else if (data[i].dataValues.stage == "On Site") {
//         // console.log("onsite");
//         obj.onSite.push(data[i].dataValues.jobName);
//       } else if (data[i].dataValues.stage == "Offers") {
//         // console.log("offer");
//         obj.offers.push(data[i].dataValues.jobName);
//       } else if (data[i].dataValues.stage == "Rejected") {
//         // console.log("reject");
//         obj.rejected.push(data[i].dataValues.jobName);
//       }
//     }
//     console.log(obj);
//     res(obj);
//   });
// }

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

module.exports = router;

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/job-board", (req, res) => {
    res.render("job_board");
  });
};

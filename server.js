const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));

// We need to use sessions to keep track of our user's login status TODO: Figure out wtf keyboard cat is
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
      ifEquals: function (a, b, opts) {
        return a == b ? opts.fn(this) : opts.inverse(this);
      },
    },
  })
);
app.set("view engine", "handlebars");

// TODO: SWITCH THE TWO ROUTES
// require("./controllers/api-routes.js")(app);
// require("./controllers/html-routes.js")(app);

const jobsRoutes = require("./controllers/jobsController");
app.use(jobsRoutes);

const usersRoutes = require("./controllers/usersController");
app.use(usersRoutes);


// db.sequelize.sync({ force: true }).then(function () {
db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log("Server listening on http://localhost:" + PORT);
  });
});

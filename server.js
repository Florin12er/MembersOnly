require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("./config/passport-config");
const User = require("./models/User");

const app = express();

// Middleware setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(methodOverride("_method"));

// Passport initialization
initializePassport(
    passport,
    async (email) => await User.findOne({ email }),
    async (id) => await User.findById(id),
);
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
const Register = require("./routes/register");
const Login = require("./routes/logIn"); // Adjust as per your file name
const Logout = require("./routes/logOut"); // Adjust as per your file name
const Home = require("./routes/home");
const Secret = require("./routes/secret")
const resetPassword = require("./routes/resetPassword")

app.use("/", Home);
app.use("/register", Register);
app.use("/login", Login);
app.use("/logout", Logout);
app.use("/reset", resetPassword)
app.use("/secret", Secret)

// 404 Error handling
app.use((req, res, next) => {
    res.status(404).render("404");
});

// MongoDB connection
const dbUrl = process.env.DATABASEURL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

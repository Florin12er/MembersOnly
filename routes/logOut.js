const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
  res.redirect("/login");
  });
});


module.exports = router;


const express = require("express");
const pool = require("../pool");
const bcrypt = require("bcrypt");
const logger = require('../utils/Logger');

const router = express.Router();

router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let results;
  console.log(email, password);
  let sql = "SELECT * FROM user WHERE user_id = ? ";

  pool.query(sql, email, (err, result) => {
    if (err) throw err;
    results = result[0];
    if (results) {
      
      console.log("inside", results.pwd);
      bcrypt.compare(req.body.password, results.pwd, (err, result) => {
        if (result) {
          logger.info("success: User " + email + " logged in successfully.");
          return res.send({ message: "Login Successful" });
        } else {
          logger.info("error: User " + email + " entered invalid password.");
          return res.status(400).send({ message: "Invalid Password" });
        }
      });
    } else {
      logger.info("error: " + email + " is not a valid user.");
      return res.status(400).send({ message: "Invalid Email" });
    }
  });
});

module.exports = router;

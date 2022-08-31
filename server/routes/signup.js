const express = require("express");
const pool = require("../pool");
const bcrypt = require("bcrypt");
const logger = require('../utils/Logger');

const router = express.Router();

router.post("/", async function (req, res) {

  console.log(req.body);
  const password = req.body.password;
  saltRounds = 10;
  console.log("pas", password);
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  let users = {
    user_id: req.body.email,
    pwd: encryptedPassword,
    role: req.body.role || 'Customer',
  };
  pool.query(
    "INSERT INTO user SET ?",
    users,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
        logger.info("error: Could not register user.");
      } else {
        res.send({
          code: 200,
          success: "user registered sucessfully",  
        });

        logger.info("success: User registered successfully.");

      }
    }
  );
});

module.exports = router;

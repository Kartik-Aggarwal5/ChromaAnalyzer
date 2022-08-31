const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async function (req, res) {
  pool.query(
    `select emp_des from employee where emp_email = "${req.query.email}"`,
    (err, result) => {
      if (err) {
        console.log(err);
        logger.info("error: Could not fetch role of the employee.");
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("SQL Query: select emp_des from employee where emp_email = " + req.query.email + ";")
        logger.info("success: Successfully fetched the role.");
        console.log("result", result);
        res.send(result);
      }
    }
  );
});

module.exports = router;

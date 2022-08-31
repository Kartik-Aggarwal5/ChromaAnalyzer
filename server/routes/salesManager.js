const express = require("express");
const pool = require("../pool");
const logger = require("../utils/Logger");

const router = express.Router();

var newValue = "";

router.post("/", async function (req, res) {
  console.log(req.body);
  //   const password = req.body.password;
  const { ssn } = req.body;

  pool.query(
    `SELECT emp_id from employee where emp_ssn = ${ssn}`,
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch Employee ID.");
        console.log(err);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("success: Successfully fetched Employee ID.");
        console.log("result", result[0]);
        // newValue = result.emp_id;
        let sales_manager = {
          emp_id: result[0].emp_id,
        };
        pool.query(
          "INSERT INTO sales_manager SET ?",
          sales_manager,
          function (error, results, fields) {
            if (error) {
              logger.info("error: Could not create sales manager.");
              res.send({
                code: 400,
                failed: "error occurred",
                error: error,
              });
            } else {
              logger.info("success: Sales Manager created.");
              res.send({
                code: 200,
                success: "sales manager registered sucessfully",
              });
            }
          }
        );
      }
    }
  );

  // console.log("newvalue", newValue ?? newValue);
});

module.exports = router;

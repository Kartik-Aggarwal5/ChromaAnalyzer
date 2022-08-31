const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

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
        logger.info("error: Could not fetch employee.");
        console.log(err);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("success: Employee ID successfully fetched.");
        console.log("result", result[0]);
        // newValue = result.emp_id;
        let purchasing_manager = {
          emp_id: result[0].emp_id,
        };
        pool.query(
          "INSERT INTO purchasing_manager SET ?",
          purchasing_manager,
          function (error, results, fields) {
            if (error) {
              logger.info("error: Could not create purchase manager.");
              res.send({
                code: 400,
                failed: "error occurred",
                error: error,
              });
            } else {
              logger.info("success: Purchasing manager registered sucessfully.");
              res.send({
                code: 200,
                success: "purchasing manager registered sucessfully",
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

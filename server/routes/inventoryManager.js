const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

var newValue = "";

router.post("/", async function (req, res) {
  console.log(req.body);
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
        logger.info("success: Fetched Employee Id " + result[0].emp_id + " from employee SSN " + ssn + ".");
        console.log("result",result)
        console.log("result1", result[0]);
        // newValue = result.emp_id;
        let inventory_manager = {
          emp_id: result[0].emp_id,
        };
        pool.query(
          "INSERT INTO inventory_manager SET ?",
          inventory_manager,
          function (error, results, fields) {
            if (error) {
              logger.info("error: Could not add inventory manager.");
              res.send({
                code: 400,
                failed: "error occurred",
                error: error,
              });
            } else {
              logger.info("success: Inventory Manager added.");
              res.send({
                code: 200,
                success: "inventory manager registered sucessfully",
              });
            }
          }
        );
      }
    }
  );

});

module.exports = router;

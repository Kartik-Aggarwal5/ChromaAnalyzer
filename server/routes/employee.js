const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async function (req, res) {
  pool.query(`SELECT * from employee`, (err, result) => {
    if (err) 
    {
      logger.info("error: Could not fetch employee list.");
      res.send({
        code: 400,
        failed: "error occurred",
        error: error,
      });
    } 
    else 
    {
      logger.info("SQL Query: SELECT * from employee")
      logger.info("success: Employee List successfully fetched.");

      res.send(result);
    }
  });
});

router.post("/", async function (req, res) {
  console.log(req.body);
  //   const password = req.body.password;
  const {
    emp_ssn,
    emp_email,
    emp_phone,
    emp_des,
    emp_fname,
    emp_lname,
    emp_gender,
    // user_id,
  } = req.body;

  let employee = {
    // emp_id: emp_id,
    emp_ssn: emp_ssn,
    emp_email: emp_email,
    emp_phone: emp_phone,
    emp_des: emp_des || "Worker",
    emp_fname: emp_fname,
    emp_lname: emp_lname,
    emp_gender: emp_gender,
    // user_id: user_id,
  };
  pool.query(
    "INSERT INTO employee SET ?",
    employee,
    function (error, results, fields) {
      if (error) {
        logger.info("error: Could not insert employee.");
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("success: Employee registered successfully.");
        res.send({
          code: 200,
          success: "employee registered sucessfully",
          data: results,
        });
      }
    }
  );
});

router.delete("/", async function (req, res) {
  console.log("req", req.query);
  pool.query(
    `DELETE FROM EMPLOYEE WHERE emp_id = ${req.query.id}`,
    (err, result) => {
      if (err) {
        logger.info("error: Could not delete employee.");
        console.log(err);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("success: Employee " + req.query.id + " deleted.");
        console.log("result", result);
        res.send(result);
      }
    }
  );
});

module.exports = router;

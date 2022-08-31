const express = require("express");
const pool = require("../pool");
// const bcrypt = require("bcrypt");
const logger = require('../utils/Logger');

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);
  //   const password = req.body.password;
  const {
    c_ssn,
    c_email,
    c_phone,
    c_fname,
    c_lname,
    c_address,
    // user_id,
  } = req.body;

  let customer = {
    // emp_id: emp_id,
    c_ssn: c_ssn,
    c_email: c_email,
    c_phone: c_phone,
    c_fname: c_fname,
    c_lname: c_lname,
    c_address: c_address,
    // user_id: user_id,
  };
  pool.query(
    "INSERT INTO customer SET ?",
    customer,
    function (error, results, fields) {
      if (error) {
        logger.info("error: Could not insert customer.");
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        logger.info("success: Customer " + customer.c_fname + " " + customer.c_lname + " successfully inserted.");
        res.send({
          code: 200,
          success: "customer registered sucessfully",
          data: results,
        });
      }
    }
  );
});

// POST request to add customer during signUp
// return details so user can place order


router.post("/get_undelivered_sales_ids", (req, res) => 
{
  var myquery = "SELECT * FROM sales_order WHERE sales_ord_status=0 AND placed_by=" + req.body.customer_id + " ORDER BY sales_date DESC;"

  console.log(myquery)
  pool.query(myquery, (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch undelivered sales orders.");
      throw err;
    }
    else
    {
      logger.info("SQL Query:" + myquery)
      logger.info("success: Undelivered Sales Orders successfully fetched.");
      res.send(result);
    }
  });
});

router.post("/get_customer_id", (req, res) => 
{

  var myquery = "SELECT c_id FROM customer WHERE c_email='" + req.body.c_email + "';"

  pool.query(myquery, (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch customer id.");
      throw err;
    }
    else
    {
      logger.info("SQL Query:" + myquery)
      logger.info("success: Customer ID successfully fetched.");
      res.send(result);
    }
  });
});


module.exports = router;

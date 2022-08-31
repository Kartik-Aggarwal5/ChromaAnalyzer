const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);
  const { login_email, prod_id, quantity } = req.body;

  //     //fetch the overseen by and placed_by
  const fetchOverseerQuery = `SELECT * FROM customer WHERE c_email = '${login_email}';`;
  pool.query(fetchOverseerQuery, function (overseerError, results, fields) {
    if (overseerError) {
      logger.info("error: Could not find customer.");
      console.error(overseerError);
      res.status(404).json({
        error: overseerError,
        message: "Failed to fetch logged in user.",
        login_email: login_email,
      });
    } else {
      if (!results.length)
        res.status(400).json({
          error: "Invalid login_email",
          message: "Login email provided does not exist.",
        });
      else 
      {
        logger.info("SQL Query: SELECT * FROM customer WHERE c_email = " + login_email + ";")
        logger.info("success: Successfully fetched customer.");
        const overseen_by = results[0]["ranked_by"];
        const placed_by = results[0]["c_id"];
        const insertSalesOrderQuery = `INSERT INTO sales_order (overseen_by, placed_by) VALUES (${overseen_by}, ${placed_by})`;
        pool.query(
          insertSalesOrderQuery,
          function (salesOrderError, results, fields) {
            if (salesOrderError) {
              logger.info("error: Invalid input.");
              console.error(salesOrderError);
              res.status(400).json({
                error: salesOrderError,
                message: "Invalid input (login_email)",
              });
            } else {
              logger.info("success: Sales Order inserted.");
              const salesId = results.insertId;
              const containsInsertQuery = `INSERT INTO contain (prod_id, sales_id, qty) VALUES (${prod_id}, ${salesId}, ${quantity})`;
              pool.query(
                containsInsertQuery,
                function (containError, results, fields) {
                  if (containError) {
                    console.error(containError);
                    res.status(500).json({
                      error: containError,
                      message:
                        "Either something went wrong or invalid input. Please check input again.(prod_id)",
                    });
                  } else
                    res.status(201).json({
                      message: "Successfully placed order.",
                      salesOrderId: salesId,
                      containId: results.insertId,
                    });
                }
              );
            }
          }
        );
      } // res.json({message: results[0]['ranked_by']})
    }
  });
});

module.exports = router;

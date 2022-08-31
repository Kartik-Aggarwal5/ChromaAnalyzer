const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async (req, res) => {
  const fetchQuery =
    "SELECT rm_name FROM raw_material WHERE cur_rm_stock <= 50;";
  console.log(fetchQuery);
  pool.query(fetchQuery, (error, results) => {
    if (error)
    {
      logger.info("error: Could not fetch raw materials.");
      res
        .status(500)
        .json({ error: error, message: "Failed to fetch sales_orders." });
    }
    else 
    {
      logger.info("SQL Query: SELECT rm_name FROM raw_material WHERE cur_rm_stock <= 50;")
      logger.info("success: Raw Materials successfully fetched.");
      res.status(200).json(results);
    }
  });
});

module.exports = router;

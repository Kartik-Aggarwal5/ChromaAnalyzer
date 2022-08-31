const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async (req, res) => {
  const fetchQuery =
    "select prod_name, prod_vol from product where cur_prod_stock <= 10;";
  console.log(fetchQuery);
  pool.query(fetchQuery, (error, results) => {
    if (error)
    {
      logger.info("error: Could not fetch low stock products.");
      res
        .status(500)
        .json({ error: error, message: "Failed to fetch sales_orders." });
    }
      
    else
    {
      logger.info("select prod_name, prod_vol from product where cur_prod_stock <= 10;")
      logger.info("success: Low stock products successfully fetched.");
      res.status(200).json(results);
    }
  });
});

module.exports = router;

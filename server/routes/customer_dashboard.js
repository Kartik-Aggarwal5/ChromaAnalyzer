const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

// List of Products sorted in ascending order by stock
router.get("/product_list", (req, res) => {
  pool.query("SELECT * FROM product ORDER BY cur_prod_stock;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch product list.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT * FROM product ORDER BY cur_prod_stock;")
      logger.info("success: Product list successfully fetched.");
      res.send(result);
    }
    
  });
});

// List of Top Products sold sorted by number of quantities sold
router.get("/top_products", (req, res) => {
  pool.query("SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity DESC;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch top products.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity DESC;")
      logger.info("success: Top Products successfully fetched.");
      res.send(result);
    }
    
  });
});

module.exports = router;

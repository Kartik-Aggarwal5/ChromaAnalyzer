const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async (req, res) => {
  const fetchQuery = "SELECT * FROM product;";
  pool.query(fetchQuery, function (error, results, fields) {
    if (error)
    {
      logger.info("error: Could not fetch product lists.");
      res
        .status(500)
        .json({ error: error, message: "Failed to fetch products." });
    }
      
    else 
    {
      logger.info("SQL Query: SELECT * FROM product;")
      logger.info("success: Product list successfully fetched.");
      res.status(200).json(results);
    }
  });
});

router.post("/create_product", async (req, res) => {
  var create_query = "INSERT INTO product (";

  for (const key in req.body) 
  {
    if (key != "type")
      create_query += key + ",";
  }
  create_query = create_query.slice(0, create_query.length - 1);
  create_query += ") VALUES (";

  for (const key in req.body) {
    if (key != "type")
    {
      if (key != "prod_name") create_query += req.body[key] + ",";
      else create_query += "'" + req.body[key] + "'" + ",";
    }
    
  }
  create_query = create_query.slice(0, create_query.length - 1);
  create_query += ");";

  pool.query(create_query, function (error, results, fields) {
    if (error)
    {
      logger.info("error: Could not insert product.");
      res.status(500).json({ error: error, message: "Failed to fetch" });
    }
      
    else 
    {
        logger.info("SQL Query: " + create_query)
        logger.info("success: Product inserted.");

        var myquery = "INSERT INTO " + req.body.type + " SET prod_id=" +  results.insertId + ";"
        pool.query(myquery, function (myquery_error, myquery_results) {
          if (error)
            res.status(500).json({ error: myquery_error, message: "Failed to fetch" });
          else 
          {
            res.status(200).json(myquery_results);
          }
        });

    }
  });
});

module.exports = router;

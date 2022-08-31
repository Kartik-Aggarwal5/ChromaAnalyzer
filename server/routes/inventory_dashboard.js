const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/list_raw_materials", (req, res) => {
  pool.query(
    "SELECT * FROM Raw_Material ORDER BY rm_id DESC;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch raw materials list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY rm_id DESC;")
        logger.info("success: Raw Material list successfully fetched.");
        res.send(result);
      }
    }
  );
});

router.get("/vendor_list", (req, res) => {
  pool.query(
    "SELECT * FROM Vendor AS v INNER JOIN Raw_Material AS rm ON v.rm_id=rm.rm_id;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch vendors list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM Vendor AS v INNER JOIN Raw_Material AS rm ON v.rm_id=rm.rm_id;")
        logger.info("success: Vendors list successfully fetched.");
        res.send(result);
      }
    }
  );
});

router.get("/purchase_order_list", (req, res) => {
  pool.query(
    "SELECT * FROM purchase_order AS p INNER JOIN Vendor AS v ON p.v_id=v.v_id INNER JOIN Raw_Material as r ON v.rm_id=r.rm_id ORDER BY pur_date DESC;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch purchase order list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM purchase_order AS p INNER JOIN Vendor AS v ON p.v_id=v.v_id INNER JOIN Raw_Material as r ON v.rm_id=r.rm_id ORDER BY pur_date DESC;")
        logger.info("success: Purchase Order list successfully fetched.");
        res.send(result);
      }
    }
  );
});

router.get("/scarce_raw_materials", (req, res) => {
  pool.query(
    "SELECT * FROM Raw_Material ORDER BY cur_rm_stock ASC;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch scarce raw materials list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY cur_rm_stock ASC;")
        logger.info("success: Scarce Raw Materials list successfully fetched.");
        res.send(result);
      }
    }
  );
});

router.get("/abundant_raw_materials", (req, res) => {
  pool.query(
    "SELECT * FROM Raw_Material ORDER BY cur_rm_stock DESC;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch abundant raw materials list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY cur_rm_stock DESC;")
        logger.info("success: Abundant Raw Materials list successfully fetched.");
        res.send(result);
      }
    }
  );
});

router.get("/production_list", (req, res) => {
  pool.query(
    "SELECT * FROM production as pro INNER JOIN product as p ON pro.prod_id=p.prod_id ORDER BY pro.mfg_date DESC;",
    (err, result) => {
      if (err)
      {
        logger.info("error: Could not fetch production orders list.");
        throw err;
      }
      else
      {
        logger.info("SQL Query: SELECT * FROM production as pro INNER JOIN product as p ON pro.prod_id=p.prod_id ORDER BY pro.mfg_date DESC;")
        logger.info("success: Production Orders list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// Create Production Order
router.post("/create_production_order", (req, res) => {
  console.log(req.query)
  var production_query = "INSERT INTO production ("

  for (const key in req.query)
  {
    production_query += key + ","
  }
  production_query = production_query.slice(0,production_query.length-1)
  production_query += ") VALUES ("

  for (const key in req.query)
  {
    if (key=="mfg_date" || key=="exp_date")
    {
      production_query += "str_to_date('" + req.query[key] + "','%Y-%m-%d')" + ","
    }
    else
    {
      production_query += req.query[key] + ","
    }
    
  }
  production_query = production_query.slice(0,production_query.length-1)
  production_query += ");"

  console.log(production_query)

  pool.query(production_query, (err, result) => {
    if (err)
      {
        logger.info("error: Could not create production order.");
        throw err;
      }
    else
    {
      logger.info("SQL Query: " + production_query)
      logger.info("success: Production Order created.");
      res.send(result);
    }
  });
  
});



module.exports = router;

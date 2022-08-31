const express = require("express");
const pool = require("../pool");
const logger = require("../utils/Logger");

const router = express.Router();

// Create Purchase Order
// Add qty key also which will be used in linked table
router.post("/create_purchase_order", (req, res) => {
  console.log(req.body);
  var purchase_order_query = "INSERT INTO purchase_order (";

  for (const key in req.body) {
    if (key != "qty") ``;
    {
      purchase_order_query += key + ",";
    }
  }
  purchase_order_query = purchase_order_query.slice(
    0,
    purchase_order_query.length - 1
  );
  purchase_order_query += ") VALUES (";

  for (const key in req.body) {
    if (key != "qty") {
      if (
        key == "pur_date" ||
        key == "pur_deliv_date" ||
        key == "rm_exp" ||
        key == "rm_mfg"
      ) {
        purchase_order_query +=
          "str_to_date('" + req.body[key] + "','%Y-%m-%d')" + ",";
      } else {
        purchase_order_query += req.body[key] + ",";
      }
    }
  }
  purchase_order_query = purchase_order_query.slice(
    0,
    purchase_order_query.length - 1
  );
  purchase_order_query += ");";

  // console.log(purchase_order_query)

  // var bruq = "INSERT INTO brush(prod_id) VALUES (1);"f

  pool.query(purchase_order_query, (err, result) => {
    if (err) {
      logger.info("error: Could not create purchase order.");
      throw err;
    }
    logger.info("SQL Query: " + purchase_order_query);
    logger.info("success: Purchase order successfully created.");

    var get_rm_idquery =
      "SELECT rm_id FROM vendor WHERE v_id=" + req.body.v_id + ";";
    pool.query(get_rm_idquery, (error, rmres) => {
      if (error) {
        logger.info("error: Could not fetch raw material id.");
        throw error;
      }
      logger.info("SQL Query: " + get_rm_idquery);
      logger.info("success: Raw Material ID successfully fetched.");

      var myrm_id = rmres[0].rm_id;

      var insert_linked_query =
        "INSERT INTO linked (rm_id,bill_id,qty) VALUES (" +
        myrm_id +
        "," +
        result.insertId +
        "," +
        req.body.qty +
        ")";
      pool.query(insert_linked_query, (e, r) => {
        if (e) {
          logger.info("error: Could not insert into linked table.");
          throw e;
        }
        logger.info("SQL Query: " + insert_linked_query);
        logger.info("success: Successfully inserted into linked table.");
        res.send(r);
      });
    });
  });
});

router.post("/create_rm", async (req, res) => {
  var create_query = "INSERT INTO raw_material (";

  for (const key in req.body) {
    create_query += key + ",";
  }
  create_query = create_query.slice(0, create_query.length - 1);
  create_query += ") VALUES (";

  for (const key in req.body) {
    if (key != "rm_name") create_query += req.body[key] + ",";
    else create_query += "'" + req.body[key] + "'" + ",";
  }
  create_query = create_query.slice(0, create_query.length - 1);
  create_query += ");";

    console.log(create_query)
    pool.query(create_query, function(error, result, fields) 
    {
        if (error) 
        {
          logger.info("error: Could not create raw material.");
          res.status(500).json({ error: error, message: "Failed to fetch"})
        }
        else 
        {
          logger.info("SQL Query: " + create_query)
          logger.info("success: Raw Material successfully created.");
          res.send(result);
        }
    })
})

module.exports = router;

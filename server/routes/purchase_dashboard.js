const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/list_raw_materials", (req, res) => {
  pool.query("SELECT * FROM Raw_Material ORDER BY rm_id DESC;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch raw material list.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY rm_id DESC;")
      logger.info("success: Raw Material list successfully fetched.");
      res.send(result);
    }
  });
});

router.get("/vendor_list", (req, res) => {
  pool.query("SELECT * FROM Vendor AS v INNER JOIN Raw_Material AS rm ON v.rm_id=rm.rm_id;", (err, result) => {
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
  });
});

router.get("/purchase_order_list", (req, res) => {
  pool.query("SELECT * FROM purchase_order AS p INNER JOIN Vendor AS v ON p.v_id=v.v_id INNER JOIN Raw_Material as r ON v.rm_id=r.rm_id ORDER BY pur_date DESC;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch purchase orders list.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT * FROM purchase_order AS p INNER JOIN Vendor AS v ON p.v_id=v.v_id INNER JOIN Raw_Material as r ON v.rm_id=r.rm_id ORDER BY pur_date DESC;")
      logger.info("success: Purchase Orders successfully fetched.");
      res.send(result);
    }
  });
});

router.get("/scarce_raw_materials", (req, res) => {
  pool.query("SELECT * FROM Raw_Material ORDER BY cur_rm_stock ASC;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch scarce raw materials.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY cur_rm_stock ASC;")
      logger.info("success: Scarce Raw Materials successfully fetched.");
      res.send(result);
    }
  });
});

router.get("/abundant_raw_materials", (req, res) => {
  pool.query("SELECT * FROM Raw_Material ORDER BY cur_rm_stock DESC;", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch abundant raw materials.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT * FROM Raw_Material ORDER BY cur_rm_stock DESC;")
      logger.info("success: Abundant Raw Materials successfully fetched.");
      res.send(result);
    }
  });
});

router.get("/get_rm_id_from_v_id", (req, res) => {
  pool.query("SELECT rm_id FROM vendor WHERE v_id=" + req.query.v_id + ";", (err, result) => {
    if (err)
    {
      logger.info("error: Could not fetch raw material id from vendor id.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: SELECT rm_id FROM vendor WHERE v_id=" + req.query.v_id + ";")
      logger.info("success: Raw Material Id successfully fetched.");
      res.send(result);
    }
  });
});

// Create Purchase Order
// Add qty key also which will be used in linked table
router.post("/create_purchase_order", (req, res) => {
  console.log(req.query)
  var purchase_order_query = "INSERT INTO purchase_order ("

  for (const key in req.query)
  {
    if (key != "qty")
    {
      purchase_order_query += key + ","
    }
    
  }
  purchase_order_query = purchase_order_query.slice(0,purchase_order_query.length-1)
  purchase_order_query += ") VALUES ("

  for (const key in req.query)
  {
    if (key != "qty")
    {
      if (key=="pur_date" || key=="pur_deliv_date" || key=="rm_exp" || key=="rm_mfg")
      {
        purchase_order_query += "str_to_date('" + req.query[key] + "','%Y-%m-%d')" + ","
      }
      else
      {
        purchase_order_query += req.query[key] + ","
      }
    }
    
    
  }
  purchase_order_query = purchase_order_query.slice(0,purchase_order_query.length-1)
  purchase_order_query += ");"

  pool.query(purchase_order_query, (err, result) => {
    if (err)
    {
      logger.info("error: Could not create purchase order.");
    }

      logger.info("SQL Query: " + purchase_order_query)
      logger.info("success: Purchase Order created.");
      // res.send(result);
    

    var get_rm_idquery = "SELECT rm_id FROM vendor WHERE v_id=" + req.query.v_id + ";"
    pool.query(get_rm_idquery, (error, rmres) => {
      if (error)
      {
        logger.info("error: Could not fetch raw material from vendor id.");
      }

        var myrm_id = rmres[0].rm_id
        logger.info("SQL Query: " + get_rm_idquery)
        logger.info("success: Fetched Raw material ID = " + myrm_id + " for vendor = " + req.query.v_id + ";");

        var insert_linked_query = "INSERT INTO linked (rm_id,bill_id,qty) VALUES (" + myrm_id + "," + result.insertId + "," + req.query.qty + ")"
        pool.query(insert_linked_query, (e, r) => {
          if (e)
          {
            logger.info("error: Could not insert into linked table.");
          }
          else
          {
            logger.info("SQL Query: " + insert_linked_query)
            logger.info("success: Successfully inserted in linked table;");
            res.send(r)
          }
        });

    });
    
  });

});

// Change Priority
router.post("/update_priority", (req, res) => {
  console.log(req.query)

  var priority_query = "UPDATE vendor SET v_priority=" + req.query.v_priority + " WHERE v_id=" + req.query.v_id + ";"
  // console.log(priority_query)
  pool.query(priority_query, (err, result) => {
    if (err)
    {
      logger.info("error: Could not update priority.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: " + priority_query)
      logger.info("success: Priority updated.");
      res.send(result);
    }
  });
});

// Change assigned employee
router.post("/prioritized_by", (req, res) => {
  console.log(req.query)

  var prioritized_by_query = "UPDATE vendor SET prioritized_by=" + req.query.prioritized_by + " WHERE v_id=" + req.query.v_id + ";"
  // console.log(prioritized_by_query)
  pool.query(prioritized_by_query, (err, result) => {
    if (err)
    {
      logger.info("error: Could not assign employee.");
      throw err;
    }
    else
    {
      logger.info("SQL Query: " + prioritized_by_query)
      logger.info("success: Employee assigned successfully.");
      res.send(result);
    }
  });
})

module.exports = router;

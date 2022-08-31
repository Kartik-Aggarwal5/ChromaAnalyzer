const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get('/', async (req, res) => {
    const fetchQuery = 'SELECT * FROM production;';
    pool.query(fetchQuery, function(error, results, fields) {
        if (error)
        {
          logger.info("error: Could not fetch production orders.");
          res.status(500).json({ error: error, message: "Failed to fetch production."})
        }
        else
        {
          logger.info("SQL Query: SELECT * FROM production;")
          logger.info("success: Production Orders successfully fetched.");
          res.status(200).json(results);
        }
    })
})

// Create Production Order
router.post("/create_production_order", (req, res) => {
  console.log("Req body")
  console.log(req.body)
  console.log("singalled_by:")
  
  req.body.signalled_by = parseInt(req.body.signalled_by)
  console.log(req.body.signalled_by)
  console.log(typeof(req.body.signalled_by))
  var production_query = "INSERT INTO production ("

  for (const key in req.body)
  {
    production_query += key + ","
  }
  production_query = production_query.slice(0,production_query.length-1)
  production_query += ") VALUES ("

  for (const key in req.body)
  {
    if (key=="mfg_date" || key=="exp_date")
    {
      production_query += "str_to_date('" + req.body[key] + "','%Y-%m-%d')" + ","
    }
    else
    {
      production_query += req.body[key] + ","
    }
    
  }
  production_query = production_query.slice(0,production_query.length-1)
  production_query += ");"

  // console.log("query",production_query)

  // var bruq = "INSERT INTO brush(prod_id) VALUES (1);"

  pool.query(production_query, (production_query_err, production_query_result) => 
  {
      if (production_query_err)
      {
        logger.info("error: Could not insert production order.");
        throw production_query_err;
      }
     
      logger.info("SQL Query: " + production_query)
      logger.info("success: Production Order created.");

      var get_product_id_query = "SELECT prod_id FROM production WHERE production_id=" + production_query_result.insertId + ";"
      console.log("qu:")
      console.log(get_product_id_query)

      pool.query(get_product_id_query, (get_product_id_query_err, get_product_id_query_result) => 
      {
          if (get_product_id_query_err) 
          {
            logger.info("error: Could not fetch product id.");
            throw get_product_id_query_err;
          }
          
          var product_id = get_product_id_query_result[0].prod_id
          logger.info("SQL Query: " + get_product_id_query)
          logger.info("success: Successfully fetched Product ID: " + product_id);

          
          console.log("abc",product_id)
          var update_product_stock_query = "UPDATE product SET cur_prod_stock=cur_prod_stock+" + req.body.prod_qty + " WHERE prod_id=" + product_id + ";"
          pool.query(update_product_stock_query, (update_product_stock_query_err, update_product_stock_query_result) => 
          {
              if (update_product_stock_query_err) 
              {
                logger.info("error: Could not update product stock.");
                throw update_product_stock_query_err;
              };
              logger.info("SQL Query: " + update_product_stock_query)
              logger.info("success: Successfully updated Product = " + product_id + " stock value.");

              var get_rm_query = "SELECT * FROM uses WHERE prod_id=" + product_id + ";"
              pool.query(get_rm_query, (get_rm_query_err, get_rm_query_result) => 
              {
                  if (get_rm_query_err)
                  {
                    logger.info("error: Could not fetch raw material ids.");
                    throw get_rm_query_err;
                  }
                  logger.info("SQL Query: " + get_rm_query)
                  logger.info("success: Successfully fetched Raw materials for Product = " + product_id + ".");

                  var rm_data = get_rm_query_result

                  rm_data.forEach((element) =>
                  {
                    var rm_update_query = "UPDATE raw_material SET cur_rm_stock=cur_rm_stock-" + element.rm_qty + " WHERE rm_id=" + element.rm_id + ";"

                    pool.query(rm_update_query, (rm_update_query_err, rm_update_query_result) => 
                    {
                        if (rm_update_query_err)
                        {
                          logger.info("error: Could not update raw material's stock.");
                          throw rm_update_query_err;
                        }
                        logger.info("SQL Query: " + rm_update_query)
                        logger.info("success: Successfully updated Raw materials stock for Product = " + product_id + ".");
                        res.send(rm_update_query_result)
                    })

                  })
              })

          })

      })

  })

})


module.exports = router;
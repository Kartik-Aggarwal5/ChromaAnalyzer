const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get('/get_undelivered_purchase_orders', async (req, res) => {
    const fetchQuery = 'SELECT * FROM purchase_order WHERE pur_ord_status=0;';
    pool.query(fetchQuery, function(error, results, fields) {
        if (error) 
        {
            logger.info("error: Could not fetch undelivered purchase orders.");
            res.status(500).json({ error: error, message: "Failed to fetch."})
        }
        else 
        {
            logger.info("SQL Query: SELECT * FROM purchase_order WHERE pur_ord_status=0;")
            logger.info("success: Successfully fetched undelivered purchase orders.");
            res.status(200).json(results);
        }
    })
})

router.post('/cancel_purchase_order', async (req, res) => {
    const fetchQuery = 'UPDATE purchase_order SET pur_ord_status=2 WHERE bill_id=' + req.body.bill_id + ';';
    pool.query(fetchQuery, function(error, results, fields) {
        if (error) 
        {
            logger.info("error: Could not cancel purchase orders.");
            res.status(500).json({ error: error, message: "Failed to fetch."})
        }
        else 
        {
            logger.info("SQL Query: " + fetchQuery)
            logger.info("success: Successfully cancelled purchase order.");
            res.status(200).json(results);
        }
    })
})

// Update Purchase Order Status
router.post("/update_purchase_order_status", (req, res) => 
{
    var update_query = "UPDATE purchase_order SET pur_ord_status=1 WHERE bill_id=" + req.body.bill_id + ";"

    // Query to set order status 1 in purchase_order
    pool.query(update_query, (err, result) => 
    {
        if (err)
        {
            logger.info("error: Could not update purchase order status.");
            throw err;
        }

        logger.info("SQL Query: " + update_query)
        logger.info("success: Updated purchase order status");

        //Query to get vendor id of the corresponding bill id in the purchase order
        var v_id_query = "SELECT * FROM purchase_order WHERE bill_id=" + req.body.bill_id + ";"
        pool.query(v_id_query, (v_id_query_err, v_id_query_result) => 
        {
            if (v_id_query_err)
            {
                logger.info("error: Could not fetch vendor id.");
                throw v_id_query_err;
            }
            logger.info("SQL Query: " + v_id_query)
            logger.info("success: Successfully fetched vendor id.");

            //Query to get raw matrial from vendor table corresponding to vendor id of a particular bill_id
            var rm_id_query = "SELECT * FROM Vendor WHERE v_id=" + v_id_query_result[0].v_id + ";"
            pool.query(rm_id_query, (rm_id_query_err, rm_id_query_result) => 
            {
                if (rm_id_query_err)
                {
                    logger.info("error: Could not fetch raw material id.");
                    throw rm_id_query_err;
                }
                logger.info("SQL Query: " + rm_id_query)
                logger.info("success: Successfully fetched raw material id.");

               //Query to get quantity of the raw material retrieved from the vendor table
                 var qty_id_query = "SELECT * FROM LINKED WHERE rm_id=" + rm_id_query_result[0].rm_id + ";"
                 pool.query(qty_id_query, (qty_id_query_err, qty_id_query_result) => 
                 {
                    if (qty_id_query_err)
                    {
                        logger.info("error: Could not fetch raw material quantity.");
                        throw qty_id_query_err;
                    }
                    logger.info("SQL Query: " + qty_id_query)
                    logger.info("success: Successfully fetched raw material quantity.");

                    // Query to update raw material's stock in raw material
                     var raw_mat = qty_id_query_result[0]
            
                     {
                      var update_rm_stock_query = 'UPDATE raw_material SET cur_rm_stock=cur_rm_stock+' + raw_mat.qty + " WHERE rm_id=" + raw_mat.rm_id + ";"

                       pool.query(update_rm_stock_query, (update_rm_stock_query_err, update_rm_stock_query_result) => 
                        {
                            if (update_rm_stock_query_err)
                            {
                                logger.info("error: Could not update raw material stock.");
                                throw update_rm_stock_query_err;
                            }
                            logger.info("SQL Query: " + update_rm_stock_query)
                            logger.info("success: Successfully updated raw material stock.");
                            res.send(update_rm_stock_query_result)    
                        })
                 }
            })
        })
    })
})
})
module.exports = router;
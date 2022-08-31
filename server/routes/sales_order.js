const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get('/get_undelivered_sales_orders', async (req, res) => {
    const fetchQuery = 'SELECT * FROM sales_order WHERE sales_ord_status=0;';
    pool.query(fetchQuery, function(error, results, fields) {
        if (error) 
        {
            logger.info("error: Could not fetch undelivered sales orders.");
            res.status(500).json({ error: error, message: "Failed to fetch."})
        }
        else 
        {
            logger.info("SQL Query: " + fetchQuery)
            logger.info("success: Successfully fetched undelivered sales orders.");
            res.status(200).json(results);
        }
    })
})

router.post('/cancel_sales_order', async (req, res) => {
    const fetchQuery = 'UPDATE sales_order SET sales_ord_status=2 WHERE sales_id=' + req.body.sales_id + ';';
    pool.query(fetchQuery, function(error, results, fields) {
        if (error) 
        {
            logger.info("error: Could not cancel sales order.");
            res.status(500).json({ error: error, message: "Failed to fetch."})
        }
        else 
        {
            logger.info("SQL Query: " + fetchQuery)
            logger.info("success: Successfully cancelled sales order.");
            res.status(200).json(results);
        }
    })
})

// Update Sales Order Status
router.post("/update_sales_order_status", (req, res) => 
{
    var update_query = "UPDATE sales_order SET sales_ord_status=1 WHERE sales_id=" + req.body.sales_id + ";"

    // Query to set order status 1 in sales_order
    pool.query(update_query, (err, result) => 
    {
        if (err)
        {
            logger.info("error: Could not update sales order status.");
            throw err;
        }

        logger.info("SQL Query: " + update_query)
        logger.info("success: Sales Order status updated.");

        // Query to get list of products and corresponding quantities from contain table for this sales id
        var product_ids_query = "SELECT * FROM contain WHERE sales_id=" + req.body.sales_id + ";"
        pool.query(product_ids_query, (product_ids_query_err, product_ids_query_result) => 
        {
            if (product_ids_query_err)
            {
                logger.info("error: Could not fetch list of products and quantities used.");
                throw product_ids_query_err;
            }

            logger.info("SQL Query: " + product_ids_query)
            logger.info("success: List of products successfully fetched.");


            // Query to update product's stock in product
            var products = product_ids_query_result
            products.forEach((product) =>
            {
                var update_stock_query = 'UPDATE product SET cur_prod_stock=cur_prod_stock-' + product.qty + " WHERE prod_id=" + product.prod_id + ";"

                pool.query(update_stock_query, (update_stock_query_err, update_stock_query_result) => 
                {
                    if (update_stock_query_err)
                    {
                        logger.info("error: Could not update product's stock.");
                        throw update_stock_query_err;
                    }

                    logger.info("SQL Query: " + update_stock_query)
                    logger.info("success: Product's stock updated.");
                    res.send(update_stock_query_result)
                })    
            })
            
        }); 

    });
})

module.exports = router;
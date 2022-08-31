const express = require("express");
const pool = require("../pool");
const logger = require("../utils/Logger");

const router = express.Router();

// List of customers
router.get("/list_customer", (req, res) => {
  pool.query(
    "SELECT * FROM customer ORDER BY c_ranking ASC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch customers list.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT * FROM customer ORDER BY c_ranking ASC;"
        );
        logger.info("success: Customers list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of Sales Orders sorted descendingly on date
router.get("/sales_order_list", (req, res) => {
  pool.query(
    "SELECT * FROM ((sales_order AS s INNER JOIN customer c ON s.placed_by=c.c_id) INNER JOIN contain AS con on s.sales_id=con.sales_id) INNER JOIN product AS p ON con.prod_id=p.prod_id GROUP BY s.sales_id, con.prod_id ORDER BY sales_date DESC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch sales orders list.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT * FROM ((sales_order AS s INNER JOIN customer c ON s.placed_by=c.c_id) INNER JOIN contain AS con on s.sales_id=con.sales_id) INNER JOIN product AS p ON con.prod_id=p.prod_id GROUP BY s.sales_id, con.prod_id ORDER BY sales_date DESC;"
        );
        logger.info("success: Sales Orders list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of Products sorted in ascending order by stock
router.get("/product_list", (req, res) => {
  pool.query(
    "SELECT * FROM product ORDER BY cur_prod_stock;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch product list.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT * FROM product ORDER BY cur_prod_stock;"
        );
        logger.info("success: Product list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of Top Products sold sorted by number of quantities sold
router.get("/top_products", (req, res) => {
  pool.query(
    "SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity DESC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch top products.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity DESC;"
        );
        logger.info("success: Top Products successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of Worst Products sold sorted by number of quantities sold
router.get("/worst_products", (req, res) => {
  pool.query(
    "SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity ASC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch low selling products.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT p.prod_id, p.prod_name, SUM(c.qty) AS quantity FROM product AS p INNER JOIN contain AS c ON p.prod_id=c.prod_id GROUP BY p.prod_id, p.prod_name ORDER BY quantity ASC;"
        );
        logger.info("success: Low Selling Products list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of top 5 Customers based on number of quantities purchased
router.get("/top_customers", (req, res) => {
  pool.query(
    "SELECT c.c_id, c.c_fname, c.c_lname, SUM(con.qty) as quantity FROM sales_order AS s INNER JOIN contain AS con ON s.sales_id=con.sales_id INNER JOIN customer AS c ON c.c_id=s.placed_by GROUP BY c.c_id, c.c_fname, c.c_lname ORDER BY quantity DESC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch top customers.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT c.c_id, c.c_fname, c.c_lname, SUM(con.qty) as quantity FROM sales_order AS s INNER JOIN contain AS con ON s.sales_id=con.sales_id INNER JOIN customer AS c ON c.c_id=s.placed_by GROUP BY c.c_id, c.c_fname, c.c_lname ORDER BY quantity DESC;"
        );
        logger.info("success: Top Customers list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// List of Worst 5 Customers based on number of quantities purchased
router.get("/worst_customers", (req, res) => {
  pool.query(
    "SELECT c.c_id, c.c_fname, c.c_lname, SUM(con.qty) as quantity FROM sales_order AS s INNER JOIN contain AS con ON s.sales_id=con.sales_id INNER JOIN customer AS c ON c.c_id=s.placed_by GROUP BY c.c_id, c.c_fname, c.c_lname ORDER BY quantity ASC;",
    (err, result) => {
      if (err) {
        logger.info("error: Could not fetch low buying customers list.");
        throw err;
      } else {
        logger.info(
          "SQL Query: SELECT c.c_id, c.c_fname, c.c_lname, SUM(con.qty) as quantity FROM sales_order AS s INNER JOIN contain AS con ON s.sales_id=con.sales_id INNER JOIN customer AS c ON c.c_id=s.placed_by GROUP BY c.c_id, c.c_fname, c.c_lname ORDER BY quantity ASC;"
        );
        logger.info("success: Low Buying Customers list successfully fetched.");
        res.send(result);
      }
    }
  );
});

// Change Ranking
router.post("/update_ranking", (req, res) => {
  console.log(req.query);

  var ranking_query =
    "UPDATE customer SET c_ranking=" +
    req.query.c_ranking +
    " WHERE c_id=" +
    req.query.c_id +
    ";";
  console.log(ranking_query);
  pool.query(ranking_query, (err, result) => {
    if (err) {
      logger.info("error: Could not update customer ranking.");
      throw err;
    } else {
      logger.info("SQL Query: " + ranking_query);
      logger.info("success: Successfully updated ranking.");
      res.send(result);
    }
  });
});

// Change assigned employee
router.post("/ranked_by", (req, res) => {
  console.log(req.query);

  var ranked_by_query =
    "UPDATE customer SET ranked_by=" +
    req.query.ranked_by +
    " WHERE c_id=" +
    req.query.c_id +
    ";";
  console.log(ranked_by_query);
  pool.query(ranked_by_query, (err, result) => {
    if (err) {
      logger.info("error: Could not assign employee.");
      throw err;
    } else {
      logger.info("SQL Query: " + ranked_by_query);
      logger.info("success: Employee assigned successfully.");
      res.send(result);
    }
  });
});

module.exports = router;

const express = require("express");
const pool = require("../pool");

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);
  const { login_email } = req.body;
  //     //fetch the cust_id
  const fetchOverseerQuery = `SELECT * FROM customer WHERE c_email = '${login_email}';`;
  pool.query(fetchOverseerQuery, function (overseerError, results, fields) {
    if (overseerError) {
      console.error(overseerError);
      res.status(404).json({
        error: overseerError,
        message: "Failed to fetch logged in user.",
        login_email: login_email,
      });
    } else {
      if (!results.length)
        res.status(400).json({
          error: "Invalid login_email",
          message: "Login email provided does not exist.",
        });
      else {
        const custId = results[0]["c_id"];
        const salesOrderQuery = `SELECT * FROM SALES_ORDER WHERE PLACED_BY = '${custId}';`;
        pool.query(salesOrderQuery, function (salesOrderError, results, fields) {
          if(salesOrderError){
            console.error(salesOrderError);
            res.status(404).json({
              error: salesOrderError,
              message: "Failed to fetch sales order for logged in user.",
              login_email: login_email,
            });
          } else {
            res.status(200).json({
              data : results
            })
          }
        })
      }
    }
  });
});
module.exports = router;

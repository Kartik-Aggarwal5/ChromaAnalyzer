const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.get("/", async function (req, res) {
  pool.query(
    `select msg, sent_by, read_status, notif_date, recieved_by from notification where recieved_by in (select emp_id from employee where emp_email = "${req.query.email}")  ORDER BY read_status`,
    (err, result) => {
      if (err) {
        logger.info("error: Cannot read notification.");
        console.log(err);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        console.log("result", result);
        logger.info("select msg, sent_by, read_status, notif_date, recieved_by from notification where recieved_by in (select emp_id from employee where emp_email = " + req.query.email + ")  ORDER BY read_status;")
        logger.info("success: Message retrieved succcessfully.");
        res.send(result);
      }
    }
  );
});

module.exports = router;

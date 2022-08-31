const express = require("express");
const pool = require("../pool");
const logger = require('../utils/Logger');

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);

  let notify = {
    recieved_by: req.body.recieved_by,
    sent_by: req.body.sent_by,
    msg: req.body.msg,
    // read_status: 0,
  };

  // console.log("notify", notify);

  pool.query(
    `Select emp_id from employee where emp_email = "${req.body.sent_by}"
    UNION
    Select emp_id from employee where emp_email = "${req.body.recieved_by}"
    `,
    (err, result) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        // console.log("result", result);
        pool.query(
          "INSERT INTO notification SET ?",
          {
            ...notify,
            sent_by: result[0].emp_id,
            recieved_by: result[1].emp_id,
          },
          function (error, results, fields) {
            if (error) {
              logger.info("error: Could not send notification.");
              res.send({
                code: 400,
                failed: "error occurred",
                error: error,
              });
            } else {
              logger.info("success: Notification sent successfully by " + notify.sent_by + " to " + notify.recieved_by + ".");
              res.send({
                code: 200,
                success: "Notfication added sucessfully",
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;

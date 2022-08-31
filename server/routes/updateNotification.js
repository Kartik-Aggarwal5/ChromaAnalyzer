const express = require("express");
const pool = require("../pool");
const logger = require("../utils/Logger");

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);

  let update_notification = {
    recieved_by: req.body.recieved_by,
    sent_by: req.body.sent_by,
    msg: req.body.msg,
  };

  const { msg, sent_by, recieved_by } = req.body;

  console.log("update_notification", update_notification);

  const updateQuery = `UPDATE notification SET read_status = 1 where sent_by = ${sent_by} AND recieved_by = ${recieved_by} AND msg = "${msg}"`;
  console.log(updateQuery);
  pool.query(updateQuery, function (error, results) {
    if (error) {
      logger.info("error: Could not update read status of notification.");
      res.status(404).json({
        error: error,
        message: "Failed to update the notification status.",
      });
    } else {
      logger.info("success: Successfully updated read status of notification.");
      res.status(200).json(results);
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  listTrackedByUser,
  updateTracking,
  listAllTracking,
} = require("../controllers/trackingController");

router.get("/tracking", listTrackedByUser);
router.get("/tracking/all", listAllTracking);
router.patch("/tracking", updateTracking);

module.exports = router;

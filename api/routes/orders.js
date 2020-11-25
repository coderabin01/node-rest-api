const express = require("express");
const router = express();

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Handling GET request to /orders"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Handling POST request to /orders"
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    success: true,
    message: "Passed an ID",
    orderId: orderId
  });
});

router.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Update order"
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Delete order"
  });
});

module.exports = router;

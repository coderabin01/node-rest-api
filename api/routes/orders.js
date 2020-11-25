const express = require("express");
const router = express();

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Order retrived successfully"
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order: order
  });
});

router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;

  res.status(200).json({
    success: true,
    message: "Order retrived successfully",
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

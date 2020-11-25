const express = require("express");
const router = express();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST request to /products"
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  res.status(200).json({
    message: "Passed an ID"
  });
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Update product"
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Delete product"
  });
});

module.exports = router;

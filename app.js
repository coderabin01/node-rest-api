const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware

// Controller Routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

const app = express();
app.use(morgan("dev"));

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Handling Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message
  });
});

module.exports = app;

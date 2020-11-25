const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers
const mongoose = require("mongoose");

// Controller Routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// DB Connection
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.bxwjx.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected");
});
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://dbUser:dbUser@cluster0.bxwjx.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

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

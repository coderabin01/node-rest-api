const express = require("express");
const router = express();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("_id name price")
    .exec()
    .then(results => {
      const response = {
        count: results.length,
        products: results
      };
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: error
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        createdProduct: product
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: error
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });

  // res.status(200).json({
  //   success: true,
  //   message: "Passed an ID"
  // });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        newProduct: result
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: error
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: error
      });
    });
});

module.exports = router;

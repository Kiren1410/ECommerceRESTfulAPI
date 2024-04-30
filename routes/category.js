const express = require("express");

// create express router for movies
const router = express.Router();

// load all the models
const Product = require("../models/product");

router.get("/", async (req,res) => {
    let categories = [];

    const products = await Product.find();

    products.forEach((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
          }
    });

    res.status(200).send(categories);

});

module.exports = router;
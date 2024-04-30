const express = require("express");

const {
    getProduct,
    addProduct,
    updateProduct
} = require("../controllers/product");

const router = express.Router();

const Product = require("../models/product");


router.get("/", async (req, res) => {
    try {
        const category = req.query.category;
        const products = await getProduct( category)
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const newProduct = await addProduct(
          name,
          description,
          price,
          category
        );
        res.status(200).send(newProduct);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const updatedProduct = await updateProduct(
            id,
            name,
            description,
            price,
            category
        );

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
      // put deleteMovie function here
      const product_id = req.params.id
      await Product.findByIdAndDelete(product_id);
      res.status(200).send("Succesfully deleted");
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
});

module.exports = router;
  

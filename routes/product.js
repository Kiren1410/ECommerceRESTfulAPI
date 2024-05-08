const express = require("express");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

// get products
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getProducts(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found!" });
    }
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
    const newProduct = await addProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({
      message: error.message,
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

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = router;

const express = require("express");
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
// set up product router
const router = express.Router();

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/
const Order = require("../models/order");

// get orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST - sara
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, products, totalPrice, status } =
      req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice,
      status
    );
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT - Sean
router.put("/:id", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
      paid_at,
    } = req.body;
    const updatedOrder = await updateOrder(
      req.params.id,
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
      paid_at
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// DELETE = le zhang
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    if (order) {
      await deleteOrder(id);
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

// export
module.exports = router;

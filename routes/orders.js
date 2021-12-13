const express = require("express");
const { Order, Product } = require("./../models");
let router = express.Router();
const { send } = require("./../nodemailer");

router
  .route("/")
  .post(async (req, res) => {
    const { productUuid, product, name, status } = req.body;
    try {
      const prod = await Product.findOne({ where: { uuid: productUuid } });
      const order = await Order.create({
        product,
        name,
        status,
        orderIds: prod.uuid,
      });
      return res.json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })
  .get(async (req, res) => {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

router.route("/:uuid").delete(async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const order = await Order.findOne({ where: { uuid } });
    await order.destroy();
    return res.json({ message: "Order deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router
  .route("/status/:uuid")
  .get(async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const order = await Order.findOne({
        where: { uuid },
      });
      return res.json(order.status);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  })
  .put(async (req, res) => {
    const orderIds = req.params.uuid;
    const { status, mail } = req.body;
    try {
      const order = await Order.findOne({ where: { orderIds } });
      order.status = status;
      await order.save();
      send(status, mail);
      return res.json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  });

module.exports = router;

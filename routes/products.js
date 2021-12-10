const express = require("express");
const { Product } = require("./../models");
let router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const { title, photo, cost, producer } = req.body;
    try {
      const product = await Product.create({ title, photo, cost, producer });
      return res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  })
  .get(async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  });

router
  .route("/:uuid")
  .get(async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const product = await Product.findOne({
        where: { uuid },
      });
      return res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  })
  .delete(async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const product = await Product.findOne({ where: { uuid } });
      await product.destroy();
      return res.json({ message: "Product deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  })
  .put(async (req, res) => {
    const uuid = req.params.uuid;
    const { title, photo, cost, producer } = req.body;
    try {
      const product = await Product.findOne({ where: { uuid } });
      product.title = title;
      product.photo = photo;
      product.cost = cost;
      product.producer = producer;
      await product.save();
      return res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  });

module.exports = router;

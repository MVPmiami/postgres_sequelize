const express = require("express");
const { sequelize } = require("./models");
const products = require("./routes/products");
const orders = require("./routes/orders");

const app = express();
app.use(express.json());
app.use("/products", products);
app.use("/orders", orders);

app.listen({ port: 4000 }, async () => {
  console.log("Server up on http://localhost:4000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

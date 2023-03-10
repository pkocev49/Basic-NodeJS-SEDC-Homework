import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Shop</h1>");
});

router.post("/create", (req, res) => {
  const body = req.body;
  console.log(body);

  let product = {
    id: uuidv4(),
    name: body.name,
    price: body.price,
    rating: body.rating,
    description: body.description,
    isInStock: body.isInStock,
  };

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  products.push(product);

  fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));

  res.status(201).send({ message: "Product was added in database." });
});

router.get("/products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  res.send(JSON.stringify(products, null, 2));
});

router.get("/product/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const id = req.params.id;
  const productsFound = products.find((product) => product.id === id);

  if (productsFound) {
    res.send(JSON.stringify(productsFound, null, 2));
  } else res.status(404).send({ message: "Product not found." });
});

router.delete("/product_delete/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const id = req.params.id;
  const productsFound = products.findIndex((product) => product.id === id);
  if (productsFound !== -1) {
    products.splice(productsFound, 1);
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

router.delete("/delete_all", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const prDelete = req.params.product;
  if (prDelete !== -1) {
    products.splice(prDelete);
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
    res.send({ message: "Product deleted successfully" });
  }
});

router.put("/inStock/:id", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const id = req.params.id;
  const prFound = products.findIndex((product) => product.id === id);
  if (prFound !== -1) {
    products[prFound].isInStock = false;
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
    res.status(200).send({ message: "Product is now out of stock." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

router.put("/productsEdit/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id, body);

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );

  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...body };

    fs.writeFileSync("./products.json", JSON.stringify(products));

    res.status(200).send({ message: "Product was updated successfully." });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

// BONUS

router.post("/cart/:id", (req, res) => {
  // res.send("<h1>KUR KUR</h1>");
  const id = req.params.id;

  const products = JSON.parse(
    fs.readFileSync("./products.json", { encoding: "utf-8" })
  );
  const product = products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  const cart = JSON.parse(
    fs.readFileSync("./cart.json", { encoding: "utf-8" })
  );
  cart.push(product);
  fs.writeFileSync("./cart.json", JSON.stringify(cart));
  res.status(201).send({ message: "Product was added to cart" });
});

router.get("*", (req, res) => {
  res.redirect("/");
});

export default router;

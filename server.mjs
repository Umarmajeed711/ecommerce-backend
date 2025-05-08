import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

let Products = [];

// app.get("/", (req,res) => {
//     res.send("HEllo world , on my node.js server.")
//})

app.get("/products", (req, res) => {
  res
    .status(200)
    .send({ message: "Get product Successfully!", productList: Products });
});

app.post("/product", (req, res) => {
  let reqBody = req.body;

  if (
    !reqBody?.productName ||
    !reqBody?.productPrice ||
    !reqBody?.productDescription
  ) {
    res.status(400).send({ message: "Requrired parameter missing!..." });
    return;
  }

  Products.push({
    id: new Date().getTime(),
    productName: reqBody.productName,
    productPrice: reqBody.productPrice,
    productDescription: reqBody.productDescription,
  });

  res.status(201).send({ message: "Product add Successfully!" });
});

app.delete("/product/:id", (req, res) => {
  const productId = req?.params?.id;

  let isMatch = false;

  for (let i = 0; i <= Products.length; i++) {
    if (productId == Products[i].id) {
      Products.splice(i, 1);
      isMatch = true;
      break;
    }
  }

  if (isMatch) {
    res.status(204).send({ message: "Product Delete Successfully!" });
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

app.put("/product/:id", (req, res) => {
  let productId = req.params.id;

  let reqBody = req.body;

  if (
    !reqBody.productName ||
    !reqBody.productPrice ||
    !reqBody.productDescription
  ) {
    res.status(404).send({ message: "required parameters missing!" });
    return;
  }

  let isEdit = false;

  for (let i = 0; i < Products.length; i++) {
    if (productId == Products[i].id) {
      Products[i].id = productId;
      (Products[i].productName = reqBody?.productName),
        (Products[i].productPrice = reqBody?.productPrice),
        (Products[i].productDescription = reqBody?.productDescription);

      // another way to do this
      // Products[i] = {
      //     id: productId,
      //     productName : reqBody?.productName,
      //     productPrice : reqBody?.productPrice,
      //     productDescription: reqBody?.productDescription
      // }

      isEdit = true;

      break;
    }
  }

  if (isEdit) {
    res
      .status(200)
      .send({ message: `product ${productId} is Edit successfully!` });
  } else {
    res.status(404).send({ message: `product ${productId} is not found.` });
  }
});

app.listen(port, () => {
  console.log("The project is running on port ", { port });
});

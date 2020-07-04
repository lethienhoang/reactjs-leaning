import express from "express";
import data from "./data";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id == productId);
    console.log(product);
    res.send(product);
});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
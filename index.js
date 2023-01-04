import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import referenceRouter from "./routes/reference.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();
app.use(cors());
app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
    });
    console.log("Mongo DB connected.");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.get("/", (_, res) => {
  res.send({
    message: "connected",
    _id: "test",
  });
});

app.get("/products", verifyToken, (req, res) => {
  const { userId } = req.body;
  const products = [
    {
      _id: "1",
      name: "Nike Slim Shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      _id: "2",
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
  ];

  res.status(200).send({
    message: "İşlem başarılı",
    products,
    userId,
  });
});

app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/contact", verifyToken, contactRouter);
app.use("/reference", verifyToken, referenceRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/recommend", (req, res) => {
  const userId = req.query.userId;
  // You can use userId here to customize recommendations

  // Always return 5 mock products for demo
  res.json([
    {
      id: 1,
      title: "Wireless Headphones",
      price: "$29.99",
      image: "https://m.media-amazon.com/images/I/61Iz2yy2CKL._AC_SY879_.jpg",
      score: 0.92
    },
    {
      id: 2,
      title: "Smartphone Stand",
      price: "$14.99",
      image: "https://m.media-amazon.com/images/I/71tH9dp6s1L._AC_SX679_.jpg",
      score: 0.87
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: "$39.99",
      image: "https://m.media-amazon.com/images/I/71f1bV8n4vL._AC_SX679_.jpg",
      score: 0.85
    },
    {
      id: 4,
      title: "Fitness Tracker",
      price: "$49.99",
      image: "https://m.media-amazon.com/images/I/71smqRr0pmL._AC_SY879_.jpg",
      score: 0.81
    },
    {
      id: 5,
      title: "Laptop Sleeve",
      price: "$19.99",
      image: "https://m.media-amazon.com/images/I/61hUv7yY9aL._AC_SX679_.jpg",
      score: 0.78
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
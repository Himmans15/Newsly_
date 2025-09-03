require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Optional but recommended for JSON payloads

const API_KEY = process.env.API_KEY;

// Helper function to fetch news
const fetchNews = async (url, res) => {
  try {
    const response = await axios.get(url);

    if (response.data.totalResults > 0) {
      res.json({
        status: 200,
        success: true,
        message: "Successfully fetched the data",
        data: response.data,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        message: "No more results to show",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Failed to fetch data from API",
      error: error.message,
    });
  }
};

app.get("/all_news", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;

  const url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

app.options("/top_headlines", cors());
app.get("/top_headlines", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "business";

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language-en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const country = req.params.iso;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&language-en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

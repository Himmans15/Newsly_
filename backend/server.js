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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

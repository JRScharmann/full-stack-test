const express = require("express");
const axios = require("axios");
const router = express.Router();
const { authenticateToken } = require("../middleware");

const PUNKAPI = "https://punkapi.online/v3";

// Get beers from PunkAPI
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { page = 1, perPage = 15 } = req.query;
    const response = await axios.get(`${PUNKAPI}/beers?page=${page}&per_page=${perPage}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching beers:", error);
    res.status(500).json({
      message: "Error fetching beers",
      error: error.response?.data || error.message,
    });
  }
});

// Proxy for PunkAPI images
router.get("/images/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`${PUNKAPI}/images/${id}`, {
      responseType: "stream",
    })
    .then((response) => {
      response.headers["content-type"] &&
        res.set("content-type", response.headers["content-type"]);
      response.data.pipe(res);
    })
    .catch((error) => {
      console.error("Error proxying image:", error);
      res.status(error.response?.status || 500).send(error.message);
    });
});

module.exports = router;

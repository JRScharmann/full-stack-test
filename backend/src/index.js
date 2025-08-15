require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const beerRoutes = require("./routes/beer.routes");
const { AppDataSource } = require("./data-source");
const { corsMiddleware } = require("./middleware");

const app = express();
app.use(express.static("build"));
app.use(corsMiddleware);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/beers", beerRoutes);

app.get("/api/status", (req, res) => {
  res.json({ status: "OK" });
});

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  // Skip API routes
  if (!req.url.startsWith("/api/")) {
    res.sendFile("build/index.html", { root: "." });
  } else {
    res.status(404).json({ message: "API route not found" });
  }
});


const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


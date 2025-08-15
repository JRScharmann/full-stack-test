const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { AppDataSource } = require("../data-source");

// Middleware for JWT authentication
const { authenticateToken } = require("../middleware");

// Get all users
router.get("/", authenticateToken, async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const users = await userRepo.find();
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPassword);
});

// Get user by id
router.get("/:id", authenticateToken, async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const user = await userRepo.findOne({
    where: { id: parseInt(req.params.id) },
  });
  if (!user) return res.sendStatus(404);
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Create user
router.post("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password são obrigatórios." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, password: hashedPassword });
  await userRepo.save(user);
  const { password: pw, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
});

// Update user
router.put("/", authenticateToken, async (req, res) => {
  const userRepo = getRepository("User");
  const user = await userRepo.findOne(req.user.id);
  if (!user) return res.sendStatus(500);
  const { username, password } = req.body;
  if (username) user.username = username;
  if (password) {
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password inválido." });
    }
    user.password = await bcrypt.hash(password, 10);
  }
  await userRepo.save(user);
  const { password: pw, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Delete user
router.delete("/", authenticateToken, async (req, res) => {
  const userRepo = getRepository("User");
  const user = await userRepo.findOne(req.user.id);
  if (!user) return res.sendStatus(500);
  await userRepo.remove(user);
  res.sendStatus(204);
});

module.exports = router;

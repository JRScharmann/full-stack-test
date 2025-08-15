const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AppDataSource } = require("../data-source");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const { username, password } = req.body;
  const user = await userRepo.findOne({ where: { username } });
  if (!user)
    return res.status(400).json({ message: "Usuário ou senha incorreta" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(400).json({ message: "Usuário ou senha incorreta" });
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

module.exports = router;

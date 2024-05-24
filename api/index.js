const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "jjkehdh3ekjfhi3f8wjkehfjkwhejkfd";
const cookieParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://Blog:nsFwDTlRtD7HaTLM@cluster0.ildw0e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, userName } = req.body;
  if (!userName) {
    return res.status(400).json({ message: "User name is required" });
  }
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(409).json({ message: "User name already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = new User({ email, password: hashedPassword, userName });

  await user.save();
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

  res.json({ token });
});

// Middleware to handle errors (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

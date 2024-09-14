const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "jjkehdh3ekjfhi3f8wjkehfjkwhejkfd";
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://Blog:ho123@cluster0.ildw0e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.json(posts); // Send the posts as a JSON response
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
});
app.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    // Utiliser Mongoose pour trouver le post par ID
    const post = await Post.findById(postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  console.log(req.file); // Check if file is received
  console.log(req.body); // Check if other fields are received

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  try {
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });

    res.json(postDoc);
  } catch (err) {
    console.error("Error processing the post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/uploads", express.static("uploads"));

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

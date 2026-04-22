console.log("MY SERVER FILE RUNNING");
const jwt = require("jsonwebtoken");
const Student = require("./models/Student");
const bcrypt = require("bcrypt");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect("mongodb://yogi_:yogesh321@ac-2y2t0vu-shard-00-00.q2lh6kp.mongodb.net:27017,ac-2y2t0vu-shard-00-01.q2lh6kp.mongodb.net:27017,ac-2y2t0vu-shard-00-02.q2lh6kp.mongodb.net:27017/studentDB?ssl=true&replicaSet=atlas-r0bihg-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      course
    });

    await newStudent.save();

    res.status(201).json({ msg: "Registered Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user._id },
      "secret123",   // secret key (simple for now)
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    const decoded = jwt.verify(token, "secret123");

    req.user = decoded; // user id mil jayegi

    next();

  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/update-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Student.findById(req.user.id);

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
app.put("/api/update-course", authMiddleware, async (req, res) => {
  try {
    const { course } = req.body;

    const user = await Student.findById(req.user.id);

    user.course = course;
    await user.save();

    res.json({ msg: "Course updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
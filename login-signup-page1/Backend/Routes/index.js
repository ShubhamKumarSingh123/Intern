const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "abcddakjfnadnn23y4y3'][]0-0dajnjakdndcnanadadeuvcc13e4134413";
const mongoUrl =
  "mongodb+srv://singhshubhamkumar457:9acl6g4yVryXmQCE@cluster0.xfeirbo.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("../models/userDetails");
require("../models/extractData");
const User = mongoose.model("userInfo");
const Data = mongoose.model("textExtract");

app.post("/data", async (req, res) => {
  const { url } = req.body;
  let text = [];
  try {
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);
    var t = $("html *")
      .contents()
      .map(function () {
        return this.type === "text" ? $(this).text() : "";
      })
      .get()
      .join(" ");
    await Data.create({
      url: t,
    });

    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "OK" });
  } catch (err) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User does not found" });
  }
  if (bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 1000,
    });
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  return res.json({ status: "error", error: "invalid password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

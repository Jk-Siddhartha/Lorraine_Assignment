const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(express.json());

//database url to mongodb atlas
const DB =
  "mongodb+srv://admin:admin@cluster0.30pz8m6.mongodb.net/loginRegister?retryWrites=true&w=majority";

//database connection code
mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

//user schema code
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

//user schema connection to mongodb atlas
const User = mongoose.model("user2", userSchema);

const productSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("products", productSchema);

//apis will go here
app.get("/", (req, res) => {
  res.send("hii from server");
});

app.post("/", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (err) {
    console.error("Error retrieving products:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      if (password === userLogin.password) {
        return res
          .status(200)
          .json({ message: "user login successfully", userData: userLogin });
      } else {
        return res.status(422).json({ error: "User not found" });
      }
    } else {
      return res.status(422).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(`not logined ${err}`);
  }
});

app.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords are not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });
      await user.save();

      res.status(201).json({ message: "succesfully inserted" });
    }
  } catch (err) {
    console.log(err);
  }
});

//server listing function
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

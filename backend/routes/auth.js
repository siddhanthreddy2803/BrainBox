const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()

const SECRET_KEY = process.env.JS_WT;

// Register
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashpassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashpassword });
        await user.save();
        return res.status(200).json({ message: "SignUp Successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Please Sign Up First" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not Correct" });
        }
        const token = jwt.sign(
            { id: user._id, email : user.email },
            SECRET_KEY,
            {expiresIn: "1h"}
        )

        const { password, ...others } = user._doc;
        return res.status(200).json({ user: others, token });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

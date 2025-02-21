const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const authController = require('express').Router();

authController.post('/signup', async(req, res) => {
    try {
      const isExisting = await User.findOne({email: req.body.email})  
      if(isExisting){
        throw new Error("Already such an account with this email. Try a new one!")
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = await User.create({...req.body, password: hashedPassword})
      const {password, ...others} = newUser._doc
      const jwtToken = jwt.sign(
        { email: newUser.email, _id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )
    res.status(200)
    .json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        userId : newUser._id,
        name: newUser.name
    })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

authController.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                userId : user._id,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
});

module.exports = authController
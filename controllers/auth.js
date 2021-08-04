const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'eJtO0PBXRWlE0oQhRp9W79Edpqh6MQSr', {
//     expiresIn: maxAge
//   });
// };

module.exports.register_post = async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;
    let errors = [];
    if (!username || !email || !password || !password2) {
      errors.push({ msg: "Please fill the all fields." });
    }
    if (password !== password2) {
      errors.push({ msg: "Passwords do not match." });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters." });
    }
    if (errors.length < 1) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const user = await User.findOne({ email: email, username: username })
      if (user) {
        errors.push({ msg: "Email or username already registered." })
        res.status(401).json(errors)
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: hashedPass,
        });
        const user = await newUser.save();
        // const token = createToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user);
      }
    }
    else {
      res.status(401).json(errors)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid) {
        const { password, ...others } = user._doc;
        // const token = createToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(others);
      } else {
        res.status(401).json("Wrong password.")
      }
    } else {
      res.status(401).json("Email is not registered.")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

// module.exports.logout_get = (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/');
// }
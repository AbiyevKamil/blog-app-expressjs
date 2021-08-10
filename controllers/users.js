const User = require('../models/User');
const Blog = require('../models/Blog');
const Token = require('../models/resetToken');
const crypto = require('crypto');

// Delete User
module.exports.delete_user = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Blog.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found.");
    }
  }
};

// Find User By ID
module.exports.find_user_by_id = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.json({ user: others, status_code: 200 });
  } catch (err) {
    res.json({ error: err, status_code: 500 });
  }
};

// Find User By Username
module.exports.find_user_by_username = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reset Password Send Email
module.exports.forgot_password_send_email = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }
      const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset.", link);
    } else {
      res.status(500).json("Email is not registered.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reset Password 
module.exports.reset_password = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      try {
        const token = Token.findOne({ userId: user._id, token: req.params.token });
        if (token) {
          if (req.body.password >= 6) {
            user.password = req.body.password;
            await user.save();
            await token.delete();
            res.status(200).json("Password resetted successfully.");
          } else {
            res.status(400).json("Password must be at least 6 characters.");
          }
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json("err");
  }
};

// Add Profile Picture
module.exports.add_pp = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const user = await User.findById(req.params.id);
      user.image = req.body.image;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json("You can only change your profile picture.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


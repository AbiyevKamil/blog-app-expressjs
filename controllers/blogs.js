const User = require('../models/User');
const Blog = require('../models/Blog');

module.exports.create_post = async (req, res) => {
  try {
    const { username, title, body, category } = req.body;
    let errors = [];
    if (!username || !title || !body || !category) {
      errors.push({ msg: "Blog must have title, body, category" });
    }
    const anyTitle = await Blog.findOne({ title: title });
    if (anyTitle) {
      errors.push({ msg: "Blog with this title is already exist." });
    }
    const anyBody = await Blog.findOne({ body: body });
    if (anyBody) {
      errors.push({ msg: "Blog with this body is already exist." });
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const newBlog = await new Blog({
        username: username,
        title: title,
        body: body,
        category: category,
        image: req.body.image,
        likes: 0
      });
      const blog = await newBlog.save();
      res.status(200).json(blog);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.get_all = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.get_blog_by_id = async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.get_blog_by_username = async (req, res) => {
  try {
    const blogs = await Blog.find({ username: req.params.username });
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json({err});
  }
};

module.exports.get_blogs_by_category = async (req, res) => {
  try {
    const blogs = await Blog.find({ category: { "$in": req.params.category } });
    res.status(200).json(blogs);
  } catch {
    res.status(500).json("There are no blogs in that category.");
  }
};

module.exports.delete_blog = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const blog = await Blog.findById(req.params.blogId);
    if (user.username === blog.username) {
      await Blog.findByIdAndDelete(blogId, { useFindAndModify: false });
    } else {
      res.status(400).json("You can delete only your own posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.like_blog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id,
      {
        $inc: { likes: 1 }
      }, { new: true, useFindAndModify: false }
    );
    res.status(200).json(blog);
  } catch {
    res.status(500).json(err);
  }
};


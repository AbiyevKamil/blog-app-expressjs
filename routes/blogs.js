const router = require("express").Router();
const blogController = require("../controllers/blogs");

// Create New Blog
router.post("/create_post", blogController.create_post);

// Update blog will be added later.

// Get All Blogs
router.get("/all", blogController.get_all);

// Get Blog By ID
router.get("/get_by_id/:id", blogController.get_blog_by_id);

// Get Blog By Username
router.get("/get_by_username/:username", blogController.get_blog_by_username);

// Delete Blog
router.delete("/delete/:userId/:blogId", blogController.delete_blog);

// Like Post
router.put("/like/:id", blogController.like_blog);

// Get blogs by category
router.get("/get_by_category/:category", blogController.get_blogs_by_category);

module.exports = router;

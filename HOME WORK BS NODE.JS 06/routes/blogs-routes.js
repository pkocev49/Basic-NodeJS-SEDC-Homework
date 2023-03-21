import session from "express-session";
import express from "express";
import BlogController from "../controllers/blog-controler.js";
import { Blog } from "../entities/blogs-entities.js";
import BlogModel from "../models/blogs-models.js";
import { authSession } from "../HOME WORK 07/sessions/auth.session.js";
import { isLoggedInValidator } from "../HOME WORK 07/middleware/session.auth.validation.js";
import { blogsSession } from "../HOME WORK 07/sessions/blogs.session.js";
// import { v4 as uuidV4 } from "uuid";
const blogController = new BlogController();
const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res) => {
  const queryParam = req.query;
  console.log(queryParam);
  const blogs = await blogController.listBlogs();
  res.send(blogs);
});

blogsRouter.post(
  "/create",
  authSession,
  isLoggedInValidator,
  async (req, res) => {
    const session = req.session;
    console.log("session", session);
    const body = req.body;
    if (!body.title || !body.body || !body.author || !body.tags) {
      res.status(404).send({ message: "Req body invalid" });
      return;
    }
    await blogController.createBlog(
      body.title,
      body.body,
      body.author,
      body.date,
      body.tags
    );
    res.status(201).send({ message: "Blog created" });
  }
);

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body, tags } = req.body;

  if (!title || !body || !tags) {
    res.status(400).send({ message: "Invalid body." });
  }

  const result = await blogController.editBlog(id, title, body, tags);

  if (result) {
    res.status(200).send({ message: `Post with ID "${id}" was updated.` });
  } else {
    res.status(404).send({ message: `Post with ID "${id}" not found.` });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletingBlog = await blogController.deleteBlog(id);

  if (deletingBlog) {
    res.status(201).send({ message: `Blog with id: ${id} deleted` });
  } else {
    res.status(404).send({ message: `This id:${id} does not exist` });
  }
});

blogsRouter.get("/tags", async (req, res) => {
  const tags = req.query.tags;
  //http://localhost:3000/blogs/tags?tags=games the url
  const bTags = await blogController.findTags(tags);

  // if (bTags.length != 0) {
  res.status(200).send(bTags);
  // } else {
  // res.status(404).send(`There are you posts with this tag:${tags}`);
  // }
});

export default blogsRouter;

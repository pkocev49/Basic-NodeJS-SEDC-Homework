import fileService from "../shared-services/file-service.js";
import { Blog } from "../entities/blogs-entities.js";

// import { authSession } from "../HOME WORK 07/sessions/auth.session.js";
class BlogModel {
  async getBlogs() {
    const rawBlogs = await fileService.readFile("./db/blogs.json");
    const blogs = JSON.parse(rawBlogs);
    return blogs;
  }
  async createBlog(id, title, body, author, date, tags) {
    const rawBlogs = await fileService.readFile("./db/blogs.json");
    const blogs = JSON.parse(rawBlogs);
    const blog = new Blog(id, title, body, author, date, tags);
    console.log(blog);
    blogs.push(blog);
    await fileService.writeFile(
      "./db/blogs.json",
      JSON.stringify(blogs, null, 2)
    );
  }

  async deleteBlog(id) {
    const rawBlogs = await fileService.readFile("./db/blogs.json");
    const blogs = JSON.parse(rawBlogs);
    const findBlog = blogs.findIndex((blog) => blog.id === id);

    if (findBlog !== -1) {
      blogs.splice(findBlog, 1);
      fileService.writeFile("./db/blogs.json", JSON.stringify(blogs, null, 2));
      return true;
    } else {
      return false;
    }
  }

  async editBlog(id, title, body, tags) {
    const rawBlogs = await fileService.readFile("./db/blogs.json");
    const blogs = JSON.parse(rawBlogs);

    const blogIndex = blogs.findIndex((blog) => blog.id === id);

    if (blogIndex !== -1) {
      blogs[blogIndex].title = title;
      blogs[blogIndex].body = body;
      blogs[blogIndex].tags = tags;

      await fileService.writeFile(
        "./db/blogs.json",
        JSON.stringify(blogs, null, 2)
      );

      return true;
    } else {
      return false;
    }
  }
  // async findTags(tags) {
  //   const rawBlogs = await fileService.readFile("./db/blogs.json");
  //   const blogs = JSON.parse(rawBlogs);
  //   const filteredBlogs = blogs.filter((blog) => {
  //     const blogTags = blog.tags.map((tag) => tag.toLowerCase());
  //     const searchTag = tags.split(",").map((tag) => tag.trim().toLowerCase());
  //     return searchTag.every((tag) => blogTags.includes(tag));
  //   });
  //   return filteredBlogs;
  // }
  // Seccond awnser>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async findTags(tags) {
    const rawBlogs = await fileService.readFile("./db/blogs.json");
    const blogs = JSON.parse(rawBlogs);
    const findTags = blogs.filter((blog) => blog.tags.includes(tags));
    if (findTags.length > 0) {
      await fileService.writeFile(
        "./db/blogs.json",
        JSON.stringify(blogs, null, 2)
      );
      return { success: true, findTags };
    } else {
      return { success: false, message: "No matching blogs found" };
    }
  }
}

export default BlogModel;

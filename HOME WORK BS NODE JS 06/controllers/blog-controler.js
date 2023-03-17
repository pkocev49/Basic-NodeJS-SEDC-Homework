import BlogModel from "../models/blogs-models.js";

const blogsModel = new BlogModel();

class BlogController {
  async listBlogs() {
    const listBlogs = await blogsModel.getBlogs();

    let htmlView = `
    <!DOCTYPE html>
             <html>
               <head>
                <title>My Blog</title>
                </head>
               <body>
                    <h1>List of All Blogs</h1>
                    <ul>
                
        `;

    listBlogs.forEach((blog) => {
      htmlView += `
                <li><b>ID:${blog.id}</b></li>
                <li>Title:${blog.title}</li>
                <li>Body:${blog.body}</li>
                <li>Author:${blog.author}</li>
                <li>Date:${blog.date}</li>
                <li>Tags:${blog.tags}</li>
                <hr>
                <br>
            `;
    });

    htmlView += `
        </ul>
        </body>
        </html>

    `;
    return htmlView;
  }
  async createBlog(id, title, body, author, date, tags) {
    await blogsModel.createBlog(id, title, body, author, date, tags);
  }
  async deleteBlog(id) {
    const deletingBlog = await blogsModel.deleteBlog(id);
    return deletingBlog;
  }
  async editBlog(id, title, body, tags) {
    const editedBlog = await blogsModel.editBlog(id, title, body, tags);

    return editedBlog;
  }
  async findTags(tags) {
    const foundTag = await blogsModel.findTags(tags);
    return foundTag;
  }
}

export default BlogController;

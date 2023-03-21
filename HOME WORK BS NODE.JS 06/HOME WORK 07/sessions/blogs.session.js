import expressSession from "express-session";

export const blogsSession = expressSession({
  secret: "secret123",
  name: "blogs_session",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});

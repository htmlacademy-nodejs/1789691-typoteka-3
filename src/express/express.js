'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const articlesRoutes = require(`./routes/articles`);
const searchRoutes = require(`./routes/search`);
const categoriesRoutes = require(`./routes/categories`);
const port = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/categories`, categoriesRoutes);


app.listen(port, () => {
  console.info(`The Express server is running on ${port} port`);
});

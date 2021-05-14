'use strict';

const express = require(`express`);

const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const articlesRoutes = require(`./routes/articles`);
const searchRoutes = require(`./routes/search`);
const categoriesRoutes = require(`./routes/categories`);

const {DEFAULT_PORT} = require(`../../constants`);

const app = express();
app.set(`views`, `./templates`);
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);


app.listen(DEFAULT_PORT, () => {
  console.info(`The Express server is running on ${DEFAULT_PORT} port`);
});

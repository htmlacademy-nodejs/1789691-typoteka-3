'use strict';

const {HttpCodes} = require(`../../../constants`);

module.exports = (service) => {
  return (req, res, next) => {
    const article = service.findOne(req.params.id);
    if (!article) {
      return res.status(HttpCodes.NOT_FOUND).send(`The article with ID '${req.params.id}' does not found`);
    }

    res.locals.article = article;
    return next();
  };
};

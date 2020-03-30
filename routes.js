const { Router } = require("express");
const OpportunityController = require("./src/app/Controllers/OpportunityController");
const routes = new Router();

routes.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Welcome Integration LinkApi Backend Test",
    version: "1.0"
  });
});

routes.get("/opportunity", OpportunityController.get);

module.exports = routes;

const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(categoryController) {
    this.controller = categoryController;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.controller.addCategory.bind(this.controller)
    )
    router.post("/sightings-categories", this.controller.createSightingCategories.bind(this.controller))
    return router;
  }
}

module.exports = CategoryRouter;

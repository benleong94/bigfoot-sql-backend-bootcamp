const cors = require('cors')
const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const db = require("./db/models/index");
const { comment, sighting, category, sightingsCategories } = db;

const SightingsRouter = require("./routers/sightingsRouter");
const SightingsController = require("./controllers/sightingsController");
const sightingsController = new SightingsController(
  sighting,
  comment,
  category,
  sightingsCategories
);
const sightingRouter = new SightingsRouter(sightingsController).routes();

const CategoryRouter = require("./routers/categoryRouter");
const CategoryController = require("./controllers/categoryController");
const categoryController = new CategoryController(category, sighting);
const categoryRouter = new CategoryRouter(categoryController).routes();  

// using the routers
app.use('/sightings', sightingRouter)
app.use('/categories', categoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

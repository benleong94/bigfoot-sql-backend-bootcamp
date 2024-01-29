const BaseController = require("./baseController");

class CategoryController extends BaseController {
  constructor(model, sightings) {
    super(model);
    this.sightings = sightings
  }

  async addCategory(req, res) {
    try {
      const data = req.body.name;
      const category = await this.model.create({
        name: data
      });
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createSightingCategories (req, res) {
    try {
        const { sightingId, categories } = req.body;
        const sighting = await this.sightings.findByPk(sightingId);
        await sighting.setCategories(categories);
        const newSighting = await this.sightings.findByPk(sightingId, {
          include: [this.model],
        });
        return res.json(newSighting);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = CategoryController;

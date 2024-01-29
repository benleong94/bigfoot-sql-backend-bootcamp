const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comment, category, sightingsCategories) {
    super(model);
    this.comment = comment;
    this.category = category;
    this.sightingsCategories = sightingsCategories;
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: this.category
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: [this.category],
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Add one sighting
  async addSighting(req, res) {
    try {
      const data = req.body;
      const sighting = await this.model.create(data);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Delete one sighting
  async deleteSighting(req, res) {
    try {
      const { sightingId } = req.params;
      await this.sightingsCategories.destroy({
        where: { sightingId: sightingId }
      });
      await this.comment.destroy({
        where: { sightingId: sightingId },
      });
      const deleted = await this.model.destroy({
        where: { id: sightingId },
      });

      if (deleted) {
        res.status(200).send("User deleted");
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  //Delete one sighting
  async editSighting(req, res) {
    try {
      const { sightingId } = req.params;
      const { date, location, notes } = req.body; // Add other fields as necessary

      const [updated] = await this.model.update(
        { date, location, notes },
        {
          where: { id: sightingId },
        }
      );

      if (updated) {
        const updatedUser = await this.model.findOne({
          where: { id: sightingId },
        });
        res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getComments(req, res) {
    try {
      const { sightingId } = req.params;
      const output = await this.comment.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createComment(req, res) {
    try {
      const { sightingId } = req.params;
      await this.comment.create({
        content: req.body.content,
        sightingId: sightingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const output = await this.comment.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteComment(req, res) {
    try {
      const { sightingId, commentId } = req.params;
      const deleted = await this.comment.destroy({
        where: { id: commentId },
      });

      const output = await this.comment.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(output);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = SightingsController;

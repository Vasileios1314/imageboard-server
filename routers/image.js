const { Router } = require("express");
const Images = require("../models").image;

const router = new Router();

router.get("/", async (request, response, next) => {
  try {
    const image = await Images.findAll();

    if (!image) {
      response.status(404).send("No images");
    } else {
      response.send(image);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, title } = req.body;
    if (!url || !title) {
      res.status(400).send("missing url or title!");
    } else {
      const newImages = await Images.create({
        url,
        title,
      });
      res.send(newImages);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const getImage = await Images.findByPk(id);

    if (!getImage) {
      response.status(404).send("No image with that ID");
    } else {
      response.send(getImage);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;

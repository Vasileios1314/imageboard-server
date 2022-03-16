const { Router } = require("express");
const Users = require("../models").user;

const router = new Router();

router.get("/", async (request, response, next) => {
  try {
    const user = await Users.findAll();

    if (!user) {
      response.status(404).send("No users");
    } else {
      response.send(user);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      // inside the parenthesis you can add only the req.body,instead of all the params, again
      const newUser = await Users.create({
        email,
        password,
        fullName,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

const Sequelize = require("sequelize");
//get Question list
router.get("/question", (req, res) =>
  Question.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.get("/question/:id", (req, res) =>
  Question.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.post("/question", (req, res) => {
  Question.create(req.body.state)
    .then(res.send(req.body))
    .catch(err => console.log(err));
});
router.put("/question", (req, res) =>
  Question.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch(err => console.log(err))
);
router.delete("/question/:id", (req, res) =>
  Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.send("success"))
    .catch(err => console.log(err))
);
module.exports = router;

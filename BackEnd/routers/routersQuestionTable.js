const express = require("express");
const router = express.Router();
const QuestionTable = require("../models/QuestionTable");
const Question = require("../models/Question");
const QuestionTable_Question = require("../models/QuestionTable_Question");
const User = require("../models/User");
const QuestionChoices = require("../models/QuestionChoices");
const Subject = require("../models/Subject");
const data = {
  question: "what is dota",
  time: 20,
  question_choices: {
    question_id: 1,
    answer: "aaa",
    is_right: 1
  },
  question_table_id: 1
};

router.get("/aa", (req, res) =>
  QuestionChoices.destroy({
    where: {
      question_id: req.params.id
    }
  })
    .then(() =>
      QuestionTable_Question.destroy({
        where: {
          question_id: req.params.id
        }
      })
    )
    .then(() =>
      Question.destroy({
        where: {
          id: req.params.id
        }
      })
    )
    .then(() => res.send("Delete Successfull"))
    .catch(err => console.log(err))
);

//get QuestionTable list
router.get("/api/questiontable", (req, res) =>
  QuestionTable.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.get("/api/questiontable/:id", (req, res) => {
  QuestionTable.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Question,
        include: QuestionChoices
      }
    ]
  }).then(data => {
    res.send(data);
  });
});
router.post("/api/questiontable", (req, res) => {
  QuestionTable.create(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});
router.put("/api/questiontable", (req, res) =>
  QuestionTable.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch(err => console.log(err))
);
router.delete("/api/questiontable/:id", (req, res) =>
  QuestionTable.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.send("success"))
    .catch(err => console.log(err))
);
//////////////get list subject
router.get("/api/subject", (req, res) =>
  Subject.findAll()
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
module.exports = router;

const express = require("express");
const router = express.Router();
const QuestionTable = require("../models/QuestionTable");
const Question = require("../models/Question");
const QuestionTable_Question = require("../models/QuestionTable_Question");
const User = require("../models/User");
const QuestionChoices = require("../models/QuestionChoices");
const Subject = require("../models/Subject");
const AnswerRecord = require("../models/AnswerRecord");

const jwt = require("jsonwebtoken");

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

router.post("/api/user_answer1", (req, res) => {
  res.send(req.body[0]);
});

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

router.post("/api/questiontable", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.admin = authData.user_id.id;
      QuestionTable.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    }
  });
});
function verifyToken(req, res, next) {
  const header = req.headers["user-token"];
  if (typeof header !== "undefined") {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}
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

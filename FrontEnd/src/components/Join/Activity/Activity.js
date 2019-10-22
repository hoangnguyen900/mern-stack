import React from "react";
import "./Activity.scss";
import { Route, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

import CompletedQuizzes from "./CompletedQuizzes/CompletedQuizzes";
import CreatedQuizzes from "./CreatedQuizzes/CreatedQuizzes";
class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        question_tables: []
      }
    };
  }

  render() {
    return (
      <div className="activity-container">
        <div className="quiz-type-navbar">
          <div className="tab-link">
            <NavLink
              exact
              to="/join/activity"
              activeClassName="active-quiz-link"
            >
              <span>
                <FontAwesomeIcon icon={faFileAlt} />
              </span>
              Created Quizzes
            </NavLink>
          </div>
          <div className="tab-link">
            <NavLink
              to="/join/activity/completed"
              activeClassName="active-quiz-link"
            >
              <span>
                <FontAwesomeIcon icon={faClipboardCheck} />
              </span>
              Completed Quizzes
            </NavLink>
          </div>
        </div>
        <div className="activity-quizzes-container">
          <Route exact path="/join/activity" component={CreatedQuizzes} />
          <Route path="/join/activity/completed" component={CompletedQuizzes} />

          {/* <CreatedQuizzes /> */}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionTable: () => {
      dispatch(actions.showListQuestionTable());
    }
  };
};
const mapStateToProps = state => {
  return {
    questionTable: state.questionTable,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);

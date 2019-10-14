import * as types from "../actions/actionTypes";
const initialState = [
  {
    questions: []
  }
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_QUESTION_ANSWERS: {
      state = [...action.data];
      return [...action.data];
    }
    case types.SHOW_QUESTION_AFTER_DELETE:
      state[0].questions.splice(action.index, 1);
      return { ...state };
    case types.CREATE_QUESTION_TABLE:
      return { ...state };
    case types.UPDATE_QUESTION_TABLE:
      return { ...state };

    default:
      return { ...state };
  }
};
export default myReducer;

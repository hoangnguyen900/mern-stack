import * as types from "../actions/actionTypes";
const initialState = [{}];

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_QUESTION_ANSWERS:
      console.log("haha", action.data);
      return { ...action.data };
    default:
      return {};
  }
};
export default myReducer;

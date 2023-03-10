import {GET_TEST,SET_TEST} from "utils/store/types"
import { initialTestState } from "utils/types/molecules/forms.interface";

//stores all tests created by user
export function testReducer(state = initialTestState, action:any) {
    switch (action.type) {
      case GET_TEST:
        return {...state};
      case SET_TEST:
        return {...state, ...action.payload };
      default:
        return state;
    }
}
  

const loginState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

export function loginReducer(state = loginState, action:any) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  }
  
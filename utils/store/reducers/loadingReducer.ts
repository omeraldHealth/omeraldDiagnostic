
const loading = {
    loading: false,
};

export function loadingReducer(state = loading, action:any) {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
          error: null,
        };
      default:
        return state;
    }
  }
  
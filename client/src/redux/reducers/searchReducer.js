const initState = {
  text: "",
};

export const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

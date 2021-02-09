export const drawerReducer = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case "SET_VISIBLE": {
      return action.payload;
    }
    default:
      return state;
  }
};

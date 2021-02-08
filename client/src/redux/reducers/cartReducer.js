let initState = [];

// * get cart from local storage
if (typeof window !== undefined) {
  if (localStorage.getItem("cart")) {
    initState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initState = [];
  }
}

export const cartReducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case "ADD_TO_CART": {
      return action.payload;
    }
    default:
      return state;
  }
};

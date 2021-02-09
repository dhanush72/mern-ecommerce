export const couponReducer = (state = false, action) => {
  const { type } = action;
  switch (type) {
    case "COUPON_APPLIED": {
      return action.payload;
    }
    default:
      return state;
  }
};

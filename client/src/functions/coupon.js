import axios from "axios";

export const createCoupon = async (coupon, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`);
};

export const removeCoupon = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/coupon/${id}`, {
    headers: {
      authtoken,
    },
  });
};

import axios from "axios";

export const getOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrders = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/update-order`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
};

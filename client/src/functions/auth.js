import axios from "axios";

export const createUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

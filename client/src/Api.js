import axios from "axios";

export const apiGet = async (endpoint, callback_fn, params = null) => {
//   let access_token = JSON.parse(localStorage.getItem("tokens"))?.[
//     "accessToken"
//   ];
  await axios
    .get(endpoint, {
      headers: {
        // "ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": "*",
        // Authorization: access_token,
      },
      params,
    })
    .then((response) => {
      callback_fn(response?.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

import axios from "axios";

export const getReviews = () => {
  return axios
    .get("https://nc-be-games.onrender.com/api/reviews")
    .then((res) => {
      return res.data;
    });
};

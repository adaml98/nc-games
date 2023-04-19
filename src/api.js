import axios from "axios";

export const getReviews = () => {
  return axios
    .get("https://nc-be-games.onrender.com/api/reviews")
    .then((res) => {
      return res.data;
    });
};

export const getReview = (review_id) => {
  return axios
    .get(`https://nc-be-games.onrender.com/api/reviews/${review_id}`)
    .then((res) => {
      return res.data;
    });
};

export const getComments = (review_id) => {
  return axios
    .get(`https://nc-be-games.onrender.com/api/reviews/${review_id}/comments`)
    .then((res) => {
      return res.data;
    });
};

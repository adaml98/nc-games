import axios from "axios";

const renderClient = axios.create({
  baseURL: "https://nc-be-games.onrender.com/api/",
  timeout: 1000,
});

export const getReviews = () => {
  return renderClient.get("reviews").then((res) => {
    return res.data;
  });
};

export const getReview = (review_id) => {
  return renderClient.get(`reviews/${review_id}`).then((res) => {
    return res.data;
  });
};

export const getComments = (review_id) => {
  return renderClient.get(`reviews/${review_id}/comments`).then((res) => {
    return res.data;
  });
};

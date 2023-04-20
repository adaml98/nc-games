import axios from "axios";

const renderClient = axios.create({
  baseURL: "https://nc-be-games.onrender.com/api/",
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

export const patchVotes = (review_id) => {
  return renderClient
    .patch(`reviews/${review_id}`, { inc_votes: 1 })
    .then((res) => {
      return res.data;
    });
};

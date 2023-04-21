import axios from "axios";

const renderClient = axios.create({
  baseURL: "https://nc-be-games.onrender.com/api/",
});

export const getReviews = async (category, sort, order) => {
  category = category ? `category=${category}` : "";
  sort = sort ? `sort_by=${sort}` : "";
  order = order ? `order=${order}` : "";
  const arr = [category, sort, order];
  let query = `reviews`;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      query += "?" + arr[i];
    } else {
      query += "&" + arr[i];
    }
  }
  //`reviews?${category}${sort}${order}`
  const res = await renderClient.get(query);
  return res.data;
};

export const getReview = async (review_id) => {
  const res = await renderClient.get(`reviews/${review_id}`);
  return res.data;
};

export const getComments = async (review_id) => {
  const res = await renderClient.get(`reviews/${review_id}/comments`);
  return res.data;
};

export const patchVotes = async (review_id) => {
  const res = await renderClient.patch(`reviews/${review_id}`, {
    inc_votes: 1,
  });
  return res.data;
};

export const postComment = async (review_id, postedComment, user) => {
  const res = await renderClient.post(`reviews/${review_id}/comments`, {
    username: user,
    body: postedComment,
  });
  return res.data;
};

export const getCategories = async () => {
  const res = await renderClient.get("categories");
  return res.data;
};

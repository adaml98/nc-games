import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import * as api from "../api.js";
import { useState } from "react";

export default function Likes({ review_id, votes, setError }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [disableButton, setDisabledButton] = useState(false);

  const handleLike = (review_id) => {
    api.patchVotes(review_id).catch((err) => {
      setError(err);
    });
    setHasLiked(!hasLiked);
    setLocalLikes(1);
    setDisabledButton(true);
  };

  return (
    <>
      <button
        disabled={disableButton}
        onClick={() => {
          handleLike(review_id);
        }}
      >
        {hasLiked ? <HeartFilled /> : <HeartOutlined />}
      </button>
      <br />
      {votes + localLikes}
    </>
  );
}

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import * as api from "../api.js";
import { useState } from "react";
import { message } from "antd";

export default function Likes({ review_id, votes }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [disableButton, setDisabledButton] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLike = (review_id) => {
    api
      .patchVotes(review_id)
      .then(() => {
        setHasLiked(!hasLiked);
        setLocalLikes(1);
        setDisabledButton(true);
      })
      .catch((err) => {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content:
            "Couldn't connect to NC Games. Make sure that you're connected to the Internet and try again.",
        });
      });
  };

  return (
    <>
      {contextHolder}
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

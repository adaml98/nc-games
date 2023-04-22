import { Button, message, Popconfirm } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as api from "../api.js";

export default function DeleteComment({
  user,
  author,
  comment_id,
  setIsCommentDeleted,
}) {
  const [disableButton, setDisabledButton] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const description = "Are you sure you want to delete your comment?";
  const text = "Delete the comment";

  const confirm = () => {
    api
      .deleteComment(comment_id)
      .then(() => {
        setDisabledButton(true);
        message.info("Comment deleted.");
        setIsCommentDeleted(true);
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

  if (user === author)
    return (
      <>
        {contextHolder}
        <Popconfirm
          placement="bottomRight"
          title={text}
          description={description}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          icon={
            <ExclamationCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          <Button type="primary" danger disabled={disableButton}>
            Delete Comment
          </Button>
        </Popconfirm>
      </>
    );
}

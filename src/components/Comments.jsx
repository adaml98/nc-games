import { useState, useEffect } from "react";
import { Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as api from "../api.js";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment.jsx";

const { Paragraph } = Typography;
export default function Comments({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();
  const [isCommentPosted, setIsCommentPosted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getComments(review_id).then((data) => {
      setComments(data.comments);
      setIsLoading(false);
      setIsCommentPosted(false);
    });
  }, [review_id, isCommentPosted]);

  if (isLoading) {
    return (
      <>
        <br />
        <LoadingOutlined style={{ fontSize: 96 }} spin />
        <br />
      </>
    );
  }

  return (
    <>
      <PostComment user={user} setIsCommentPosted={setIsCommentPosted} />
      {comments
        .reverse()
        .map(({ comment_id, body, author, votes, created_at }) => {
          return (
            <li key={comment_id} style={{ textAlign: "left" }}>
              <Divider style={{ borderBlock: "10px" }} orientation="left">
                {author}
              </Divider>
              <p>{created_at}</p>
              <Paragraph>
                <pre>{body}</pre>
              </Paragraph>
              <p>Likes: {votes}</p>
            </li>
          );
        })}
    </>
  );
}

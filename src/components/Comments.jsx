import { useState, useEffect } from "react";
import { Collapse, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as api from "../api.js";
import { useParams } from "react-router-dom";

export default function Comments({ comment_count }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();
  const { Panel } = Collapse;

  useEffect(() => {
    setIsLoading(true);
    api.getComments(review_id).then((data) => {
      setComments(data.comments);
      setIsLoading(false);
    });
  }, [review_id]);

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
    <Collapse defaultActiveKey={["1"]}>
      <Panel header={`Comments: ${comment_count}`} key="0">
        <>
          {comments.map(({ comment_id, body, author, votes, created_at }) => {
            return (
              <li key={comment_id}>
                <Divider style={{ borderBlock: "10px" }} orientation="left">
                  {author}
                </Divider>
                <p>{created_at}</p>
                <p>{body}</p>
                <p>Likes: {votes}</p>
              </li>
            );
          })}
        </>
      </Panel>
    </Collapse>
  );
}

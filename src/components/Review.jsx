import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import * as api from "../api.js";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Layout, Col, Space } from "antd";
import Comments from "./Comments.jsx";
import Likes from "./Likes.jsx";

const { Content } = Layout;

export default function Review() {
  const [
    {
      title,
      review_img_url,
      created_at,
      owner,
      designer,
      review_body,
      votes,
      comment_count,
    },
    setReview,
  ] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState("grumpy19");
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getReview(review_id).then((data) => {
      setReview(data.review);
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
    <Layout className="layout">
      <Content style={{ padding: "0 10%" }}>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              {
                title: title,
              },
            ]}
          />
          <div className="site-layout-content">
            <Col span={24}>
              <h2>{title}</h2>
              <img src={review_img_url} alt="Board game" className="review" />
              <p>Created at: {created_at}</p>
              <p>Designer: {designer}</p>
              <p>{review_body}</p>
              <p>Author: {owner}</p>
              <Likes review_id={review_id} votes={votes} />
            </Col>
          </div>
          <Comments comment_count={comment_count} />
        </Space>
      </Content>
    </Layout>
  );
}

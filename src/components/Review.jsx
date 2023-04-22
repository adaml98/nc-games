import { useState, useEffect } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import * as api from "../api.js";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Layout, Col, Space, Typography, Collapse } from "antd";
import Comments from "./Comments.jsx";
import Likes from "./Likes.jsx";
import Error from "./Error.jsx";

const { Content } = Layout;
const { Paragraph } = Typography;
const { Panel } = Collapse;

export default function Review({ user }) {
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
  const [error, setError] = useState(null);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api
      .getReview(review_id)
      .then((data) => {
        setReview(data.review);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [review_id]);

  if (error) {
    return <Error message={error.err.response.data.msg} />;
  }
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
              <p>Designer: {designer}</p>
              <Paragraph style={{ textAlign: "left" }}>
                <pre>{review_body}</pre>
                <pre style={{ textAlign: "left" }}>
                  Created at: {created_at} <br />
                  Author: {owner}
                </pre>
              </Paragraph>
              <Likes review_id={review_id} votes={votes} />
            </Col>
          </div>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header={`Comments: ${comment_count}`} key="0">
              <Comments user={user} />
            </Panel>
          </Collapse>
        </Space>
      </Content>
    </Layout>
  );
}

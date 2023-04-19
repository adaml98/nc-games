import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import * as api from "../api.js";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Layout, Row, Col } from "antd";

const { Content } = Layout;

export default function Review({ isLoading, setIsLoading }) {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
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
      </>
    );
  }
  const {
    title,
    comment_count,
    created_at,
    designer,
    owner,
    review_body,
    review_img_url,
    votes,
  } = review;

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 10%" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Col span={24}>
            <h2>{title}</h2>
            <img src={review_img_url} alt="Board game" class="review" />
            <p>Created at: {created_at}</p>
            <Row>
              <p>Owner: {owner}</p>
              <p>Designer: {designer}</p>
            </Row>
            <p>{review_body}</p>
            <Row>
              <p>Votes: {votes}</p>
              <p>Comments:{comment_count}</p>
            </Row>
          </Col>
        </div>
      </Content>
    </Layout>
  );
}

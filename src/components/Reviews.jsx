import { useState, useEffect } from "react";
import * as api from "../api.js";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

export default function Reviews({ isLoading, setIsLoading }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    api.getReviews().then((data) => {
      setReviews(data.reviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <br />
        <LoadingOutlined style={{ fontSize: 96 }} spin />
      </>
    );
  }
  return (
    <Row>
      {reviews.map(({ review_id, title, review_img_url, owner, votes }) => {
        return (
          <Col key={review_id} xs={24} xl={12}>
            <Link to={`${review_id}`} preventScrollReset={true}>
              <h2>{title}</h2>
            </Link>
            <img src={review_img_url} alt="Board game" class="reviews" />
            <h3>Author: {owner}</h3>
            <div class="heart">
              <HeartOutlined />
              <br />
              {votes}
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

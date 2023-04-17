import { useState, useEffect } from "react";
import * as api from "../api.js";
import { Row, Col } from "antd";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    api.getReviews().then((data) => {
      setReviews(data.reviews);
    });
  }, []);

  return (
    <Row>
      {reviews.map(({ review_id, title, review_img_url, owner, votes }) => {
        return (
          <Col key={review_id} xs={24} xl={12}>
            <h2>{title}</h2>
            <img src={review_img_url} alt="Board game" />
            <h3>Author: {owner}</h3>
            <p>Likes:{votes}</p>
          </Col>
        );
      })}
    </Row>
  );
}

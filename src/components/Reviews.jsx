import { useState, useEffect } from "react";
import * as api from "../api.js";
import { Row, Col } from "antd";
import { LoadingOutlined, HeartTwoTone } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import Categories from "./Categories.jsx";

export default function Reviews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category");
  useEffect(() => {
    setIsLoading(true);
    api.getReviews(category).then((data) => {
      setReviews(data.reviews);
      setIsLoading(false);
    });
  }, [category]);

  if (isLoading) {
    return (
      <>
        <br />
        <LoadingOutlined style={{ fontSize: 96 }} spin />
        <br />
        <br />
      </>
    );
  }
  return (
    <>
      <Categories
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        category={category}
      />
      <Row>
        {reviews.map(({ review_id, title, review_img_url, owner, votes }) => {
          return (
            <Col key={review_id} xs={24} xl={12}>
              <Link to={`reviews/${review_id}`} preventScrollReset={true}>
                <h2>{title}</h2>
              </Link>
              <img src={review_img_url} alt="Board game" className="reviews" />
              <h3>Author: {owner}</h3>
              <HeartTwoTone />
              <br />
              {votes}
            </Col>
          );
        })}
      </Row>
    </>
  );
}

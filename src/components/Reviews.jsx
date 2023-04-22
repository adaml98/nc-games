import { useState, useEffect } from "react";
import * as api from "../api.js";
import { Row, Col } from "antd";
import { LoadingOutlined, HeartTwoTone } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import Categories from "./Categories.jsx";
import SortReviews from "./SortReviews.jsx";
import Error from "./Error.jsx";

export default function Reviews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    api
      .getReviews(category, sort, order)
      .then((data) => {
        setReviews(data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [category, sort, order]);

  if (error) {
    return <Error message={error.err.response.data.msg} />;
  }
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
      <br />
      <SortReviews category={category} />
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

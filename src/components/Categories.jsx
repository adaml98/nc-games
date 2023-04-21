import { Button, Dropdown } from "antd";
import { useState, useEffect } from "react";
import * as api from "../api.js";
import { Link } from "react-router-dom";

export default function Categories({ category }) {
  const [categories, setCategories] = useState([]);
  const items = [{ label: <Link to={`/`}>No Filter</Link> }];

  useEffect(() => {
    api.getCategories().then((data) => {
      const categoriesList = [...data.categories];
      setCategories(categoriesList);
    });
  }, []);

  categories.map(({ slug }) => {
    return items.push({
      label: <Link to={`/?category=${slug}`}>{slug}</Link>,
    });
  });

  return (
    <>
      <br />
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ["0"],
        }}
        placement="bottom"
      >
        <Button>{category ? category : "Categories"}</Button>
      </Dropdown>
    </>
  );
}

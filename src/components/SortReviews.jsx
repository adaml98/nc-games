import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";

export default function Categories({ category }) {
  let query;
  if (!category) {
    query = "?";
  } else {
    query = `?category=${category}&`;
  }
  const items = [
    { label: <Link to={`${query}order=desc`}>Newest</Link> },
    { label: <Link to={`${query}order=asc`}>Oldest</Link> },
    {
      label: (
        <Link to={`${query}sort_by=comment_count&order=desc`}>
          Most Comments
        </Link>
      ),
    },
    {
      label: (
        <Link to={`${query}sort_by=comment_count&order=asc`}>
          Least Comments
        </Link>
      ),
    },
    {
      label: <Link to={`${query}sort_by=votes&order=desc`}>Most Likes</Link>,
    },
    {
      label: <Link to={`${query}sort_by=votes&order=asc`}>Least Likes</Link>,
    },
  ];

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
        <Button>Sort By</Button>
      </Dropdown>
    </>
  );
}

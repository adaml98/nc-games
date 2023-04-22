import { Button, Result } from "antd";
import { Link } from "react-router-dom";
export default function Error({ message }) {
  if (!message) message = "404 Not Found";
  return (
    <Result
      status="error"
      title={message}
      extra={[
        <Link reloadDocument to="/" relative="path" key={1}>
          <Button type="primary" key="home">
            Back Home
          </Button>
        </Link>,
      ]}
    ></Result>
  );
}

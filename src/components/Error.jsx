import { Button, Result } from "antd";
import { Link } from "react-router-dom";
export default function Error({ message }) {
  return (
    <Result
      status="error"
      title={message.message}
      extra={[
        <Link to="/">
          <Button type="primary" key="home">
            Back Home
          </Button>
        </Link>,
      ]}
    ></Result>
  );
}

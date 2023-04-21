import * as api from "../api.js";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

export default function PostComment({ user, setIsCommentPosted }) {
  const [postedComment, setPostedComment] = useState("");
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { review_id } = useParams();
  const [form] = Form.useForm();

  const onFinish = () => {
    api
      .postComment(review_id, postedComment, user)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Comment Posted.",
        });
        setPostedComment("");
        setIsCommentPosted(true);
        form.resetFields();
      })
      .catch((err) => {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content:
            "Couldn't connect to NC Games. Make sure that you're connected to the Internet and try again.",
        });
      });
  };

  useEffect(() => {
    if (postedComment.length < 10) setComponentDisabled(true);
    if (postedComment.length >= 10) setComponentDisabled(false);
  }, [postedComment]);

  if (user)
    return (
      <Form
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {contextHolder}
        <Form.Item>
          <p style={{ textAlign: "left" }}>Minimum length 10 characters:</p>
          <TextArea
            rows={4}
            required={true}
            maxLength={500}
            value={postedComment}
            onChange={(event) => setPostedComment(event.target.value)}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" disabled={componentDisabled}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}

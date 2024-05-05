import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { RegisterUser } from "../../apicalls/users";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onDataSubmit = async (formData) => {
    try {
      const response = await RegisterUser(formData);
      if (response.data?.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data?.message || response.message);
      }
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  });

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Welcome to Book My Things!</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onDataSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary cursor-pointer">
              {" "}
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";

const Login = () => {
  const [loginError, setloginError] = useState(null);
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error);
      setloginError(error.message);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Почта"
        rules={[
          {
            type: "email",
            message: "Такой почты не существует!",
          },
          {
            required: true,
            message: "Пожалуйста, введите корректный E-mail!",
          },
        ]}>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback>
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          {/* <a href="">Forgot password</a> */}
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Войти
        </Button>
        {loginError && (
          <p className="text-red-500 text-sm">{loginError.message}</p>
        )}
        {/* or <a href="">Register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default Login;

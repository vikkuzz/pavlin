import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [form] = Form.useForm();
  const [signUpError, setSignUpError] = useState(null);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error signing up:", error);
      setSignUpError(error.message);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Такой почты не существует!",
          },
          {
            required: true,
            message: "Пожалуйста, введите ваш E-mail!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш пароль!",
          },
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтверждение пароля"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите ваш пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="nickname"
        label="Никнейм"
        tooltip="Как вы хотите, чтобы вас называли?"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш никнейм!', whitespace: true }]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        {signUpError && (
          <p className="text-red-500 text-sm">{signUpError.message}</p>
        )}
      </Form.Item>
    </Form>
  );
};

export default SignUp;

"use client";
import { authItems } from "@/collections/authTabs";
import Login from "@/components/Login";
import SignUp from "@/components/Signup";
import { ConfigProvider, Tabs } from "antd";

const items = authItems.map((el) => {
  return {
    label: el.label,
    key: el.key,
    children: el.key === 1 ? <Login /> : <SignUp />,
  };
});

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              // cardBg: "rgba(0,0,0,0.2)",
            },
          },
        }}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={"large"}
          style={{ marginBottom: 32 }}
          items={items}
          animated
        />
      </ConfigProvider>
      {/* <h1 className="text-4xl">Войти</h1>
      <Login /> */}
    </div>
  );
};

export default LoginPage;

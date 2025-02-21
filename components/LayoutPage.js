"use client";
import React from "react";
import { Layout, theme } from "antd";
import LayoutHeader from "./LayoutHeader";

const { Content, Footer } = Layout;

const LayoutPage = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <LayoutHeader />
      <Content>
        <div
          style={{
            margin: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Vikkuzz ©{new Date().getFullYear()} Сделано жильцом для жильцов)
      </Footer>
    </Layout>
  );
};

export default LayoutPage;

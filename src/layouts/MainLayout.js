import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { Layout } from "antd";

const { Header, Content } = Layout;

function MainLayout() {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", backgroundColor: "#E13B0A" }}>
        <span
          style={{
            fontSize: "24px",
            color: "white",
            padding: 24,
            fontWeight: "bold",
          }}
        >
          HCF Delivery
        </span>
      </div>

      <Header
        style={{
          padding: "0px 16px",
          backgroundColor: "#EBEEF3",
        }}
      >
        <HeaderLayout />
      </Header>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;

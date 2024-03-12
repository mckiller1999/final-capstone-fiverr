import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import * as jwt from "jwt-decode";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN } from "../util/config";
import Footer from "../components/Footer/Footer";

const { Header, Sider, Content } = Layout;

const AdminTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userLogin = useSelector((state: any) => state.userReducer.userLogin);
  const tokenUser = userLogin && userLogin.token; // Kiểm tra userLogin có tồn tại không

  if (!tokenUser || typeof tokenUser !== "string") {
    // Kiểm tra tokenUser có tồn tại và là một chuỗi
    return <Navigate to="/" />;
  } else {
    const verify_login: any = jwt.jwtDecode(tokenUser);
    const role = verify_login.role;
    console.log(tokenUser);
    if (role !== "ADMIN") {
      return <Navigate to={"/"} />;
    } else {
      return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: <NavLink to="/admin/users">Users</NavLink>,
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: <NavLink to="/admin/orders">Jobs</NavLink>,
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: <NavLink to="/admin/product">Jobs Categlory</NavLink>,
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 800,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      );
    }
  }
};

export default AdminTemplate;

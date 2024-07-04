import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  ProductOutlined,
  FileTextOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilis/AuthProvider";
import authAPI from "../../api/auth/authAPI";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const { user, logout } = useAuth();
  const [currentSideBar, setCurrentSideBar] = useState("0")
  const navigate = useNavigate();

  const role = user?.role.roleName;

  const logoutHandle = async () => {
    await authAPI.logout()
    logout()
    navigate("/login", { replace: true })
  }


  const menuItem = [
    {
      key: "0",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("0")} />,
      label: <Link to="/dashboard">DASHBOARD</Link>,
      role: ["ADMIN", "APPRAISER"]
    },
    {
      key: "1",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("1")} />,
      label: <Link to="account_manage">Manage Account</Link>,
      role: ["ADMIN"]
    },
    {
      key: "2",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("2")} />,
      label: <Link to="product_manage">Manage Product</Link>,
      role: ["ADMIN"]
    },
    {
      key: "3",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("3")} />,
      label: <Link to="category_manage">Manage Category</Link>,
      role: ["ADMIN"]
    },
    {
      key: "4",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("4")} />,
      label: <Link to="evaluate_manage">Manage Request</Link>,
      role: ["APPRAISER"]
    },
    {
      key: "5",
      icon: <ProductOutlined onClick={() => setCurrentSideBar("5")} />,
      label: <Link onClick={logoutHandle}>Logout</Link>,
      role: ["ADMIN", "APPRAISER"]
    }
  ]


  const renderItem = () => {
    var data = menuItem.filter((item) => item.role.some((item) => item == role));
    return data
    // if (role === "ASSESSOR") {
    //   return [
    //     {
    //       key: "1",
    //       icon: <ProductOutlined />,
    //       label: <Link to={"product"}>Manage Product</Link>,
    //     },
    //     {
    //       key: "2",
    //       icon: <ProductOutlined />,
    //       label: <Link to={"category"}>Manage Category</Link>,
    //     },

    //     {
    //       key: "4",
    //       icon: <FileTextOutlined />,
    //       label: <Link to={"request"}>Manage Request</Link>,
    //     },
    //     {
    //       key: "5",
    //       icon: <ReadOutlined />,
    //       label: <Link to={"blog"}>Manage Blog</Link>,
    //     },
    //     {
    //       key: "6",
    //       icon: <LogoutOutlined />,
    //       label: <Link to={"/login"}>Logout</Link>,
    //     },
    //   ];
    // } else {
    //   return [
    //     {
    //       key: "1",
    //       icon: <UserOutlined />,
    //       label: <Link to={"account"}>Manage Account</Link>,
    //     },

    //     {
    //       key: "2",
    //       icon: <UserOutlined />,
    //       label: <Link to={"product"}>Manage Product</Link>,
    //     },

    //     {
    //       key: "3",
    //       icon: <UserOutlined />,
    //       label: <Link to={"category"}>Manage Category</Link>,
    //     },
    //     {
    //       key: "4",
    //       icon: <LogoutOutlined />,
    //       label: <Link to={"/login"}>Logout</Link>,
    //     },
    //   ];
    // }
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={currentSideBar}
          items={renderItem()}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

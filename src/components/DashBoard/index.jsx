import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilis/AuthProvider";
import authAPI from "../../api/auth/authAPI";
import { Box, Grid, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { BarChart, PieChart } from "@mui/x-charts";

const { Header, Sider, Content } = Layout;

const boxStyle = {
  border: "solid 2px",
  borderRadius: 4,
  width: 250,
  height: 150,
}

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
      label: <Link to="account_manage">Manage User</Link>,
      role: ["ADMIN"]
    },
    // {
    //   key: "2",
    //   icon: <ProductOutlined onClick={() => setCurrentSideBar("2")} />,
    //   label: <Link to="product_manage">Manage Product</Link>,
    //   role: ["ADMIN"]
    // },
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
          {/* inner dashboard */}
          {/* <Grid container spacing={2}>
            <Grid item md={3}>
              <Box style={{ "backgroundColor": "#64DFDF" }} sx={boxStyle}>
                <Typography variant="h5" padding={2}>Total Order</Typography>
                <Typography display={"flex"} padding={2} alignItems={"end"} justifyContent={"flex-end"} variant="h6">
                  <NumericFormat value={20000000} thousandSeparator="," displayType="text" />
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box style={{ "backgroundColor": "#06D001" }} sx={boxStyle}>
                <Typography variant="h5" padding={2}>Total Order</Typography>
                <Typography display={"flex"} padding={2} alignItems={"end"} justifyContent={"flex-end"} variant="h6">
                  <NumericFormat value={20000000} thousandSeparator="," displayType="text" />
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box style={{ "backgroundColor": "#A6F6FF" }} sx={boxStyle}>
                <Typography variant="h5" padding={2}>Total Order</Typography>
                <Typography display={"flex"} padding={2} alignItems={"end"} justifyContent={"flex-end"} variant="h6">
                  <NumericFormat value={20000000} thousandSeparator="," displayType="text" />
                </Typography>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box style={{ "backgroundColor": "#FF3EA5" }} sx={boxStyle}>
                <Typography variant="h5" padding={2}>Total Order</Typography>
                <Typography display={"flex"} padding={2} alignItems={"end"} justifyContent={"flex-end"} variant="h6">
                  <NumericFormat value={20000000} thousandSeparator="," displayType="text" />
                </Typography>
              </Box>
            </Grid>
          </Grid> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

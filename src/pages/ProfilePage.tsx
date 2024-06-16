import React from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperLabel,
  WrapperxInput,
} from "./style"
import CustomButton from "../components/CustomButtonProps";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";


class ProfilePage extends React.Component {
  render() {
    const handleOnChangeAvatar = async () => {
      
    };
    const handleOnChangeEmail = () => {};
    const handeUpdate = () => {};
    return (
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <WrapperContentProfile>
          <WrapperxInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="name"
              // value={name}
              onChange={handleOnChangeEmail}
            />
            <CustomButton
              onClick={handeUpdate}
              size = {40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></CustomButton>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <CustomButton
              onClick={handeUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></CustomButton>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <CustomButton
              onClick={handeUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></CustomButton>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <Upload onChange={handleOnChangeAvatar}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <CustomButton
              onClick={handeUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></CustomButton>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="address">address</WrapperLabel>
            <input
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <CustomButton
              onClick={handeUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></CustomButton>
          </WrapperxInput>
        </WrapperContentProfile>
      </div>
    );
  }
}

export default ProfilePage;

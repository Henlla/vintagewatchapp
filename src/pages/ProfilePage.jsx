import React from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperLabel,
  WrapperxInput,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../components/ButtonComponent";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../until";

class ProfilePage extends React.Component {
  render() {
    const handleOnChangeAvatar = async (fileList) => {
      const file = fileList[0];
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    };
    const handleOnChangeEmail = () => {};
    const handeUpdate = () => {};
    return (
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperHeader>Thông tin người dùng</WrapperHeader>
        <WrapperContentProfile>
          <WrapperxInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="name"
              // value={name}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
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
            ></ButtonComponent>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
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
            ></ButtonComponent>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
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
            ></ButtonComponent>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <Upload onChange={handleOnChangeAvatar}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <ButtonComponent
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
            ></ButtonComponent>
          </WrapperxInput>
          <WrapperxInput>
            <WrapperLabel htmlFor="address">address</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              // value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
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
            ></ButtonComponent>
          </WrapperxInput>
        </WrapperContentProfile>
      </div>
    );
  }
}

export default ProfilePage;

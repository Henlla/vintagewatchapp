import React, { useEffect, useState } from "react";
import { DownOutlined, UserOutlined, CheckOutlined } from "@ant-design/icons";


export const Header = () => {
  return (
    <>
      <header
        className=" top-0 sticky z-50  "
        style={{
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
      >
        <div
          className="bg-gradient-to-r from-gray-200 via-blue-200 to-white  "
          
          style={{
            borderBottomLeftRadius: "25px",
            borderBottomRightRadius: "25px",
            backgroundColor: "#24201e",
          }}
        >
          <div class=" pt-5 pr-20 pb-5  ">
            <div className=" flex flex-row justify-end w-full  ">
              <nav className="flex items-center ">
                <ul className="flex mr-8 ">
                  <li>
                    <a
                      className="px-3 py-11 text-070120 capitalize text-sm font-medium transition duration-500 "
                      href="/"
                    >
                      <span style={{ color: "#ac9984" }}>Trang Chủ</span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="px-3 py-11 text-070120 capitalize text-sm font-medium transition duration-500 "
                      href="/sanpham"
                    >
                      <span style={{ color: "#ac9984" }}>Sản Phẩm</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-3 py-11 text-070120 capitalize text-sm font-medium transition duration-500 "
                      href="/duan"
                    >
                      <span style={{ color: "#ac9984" }}>Mẫu Thiết Kế</span>
                    </a>
                  </li>
                </ul>

                <a href="/login">
                  <button className="px-8 py-5 text-sm font-medium bg-gradient-to-r from-yellow-500  to-orange-500 border transition-all duration-500 rounded-full text-white uppercaser">
                    <UserOutlined />
                    <span className="p-1  ">Đăng Nhập</span>
                  </button>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

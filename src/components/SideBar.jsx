import React from "react";

import { Layout } from "antd";
import { Logo } from "./Logo";
import { MenuList } from "./MenuList";

const { Sider } = Layout;

export const SideBar = () => {
  return (
    <Sider width={288} className="shadow-lg overflow-y-auto h-screen sidebar" style={{backgroundColor: 'white', }}>
      <Logo /> 
      <MenuList />
    </Sider>
  );
};

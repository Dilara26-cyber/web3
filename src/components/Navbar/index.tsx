import {
	Button,
	Layout,
	Menu,
} from "antd";
import React, { FC } from "react";

import { SyncOutlined } from "@ant-design/icons";

const Navbar: FC = () => {
  const {Header} = Layout;
  return <Header style={{background: "transparent"}} className="container">
  <div className="logo centered">
  <SyncOutlined />
  </div>
  <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{justifyContent: "flex-end", backgroundColor: "transparent"}}>
    {new Array(5).fill(null).map((_, index) => {
      const key = index + 1;
      return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
    })}
  </Menu>
</Header>;
};

export default Navbar;

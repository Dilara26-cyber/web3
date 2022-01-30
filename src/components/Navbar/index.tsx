import {
	Button,
	Layout,
	Menu,
	Tag,
	Tooltip,
} from "antd";
import React, {
	FC,
	useContext,
} from "react";
import { Link } from "react-router-dom";

import { SyncOutlined } from "@ant-design/icons";

import { TransactionContext } from "../../context/Transactions";
import style from "./style.module.scss";

const Navbar: FC = () => {
  const { Header } = Layout;
  const { connectWallet, connectedAccount } = useContext(TransactionContext);
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];
  return (
    <Header style={{ background: "transparent" }} className="container">
      <div className={`${style.logo} centered`}>
        <SyncOutlined />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        className={style.container}
      >
        {navLinks.map((link, index) => (
          <Menu.Item key={index}>
            <Link to={link.to}>{link.name}</Link>
          </Menu.Item>
        ))}
        <Menu.Item key={navLinks.length + 1}>
          {!connectedAccount ? (
            <Button type="primary" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Tooltip title={connectedAccount}>
              <Tag color="green">Account is connected.</Tag>
            </Tooltip>
          )}
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;

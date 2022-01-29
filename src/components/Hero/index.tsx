import {
	Button,
	Col,
	Row,
	Typography,
} from "antd";
import React, { FC } from "react";

import heroImg from "../../assets/cryptocurrency.png";
import style from "./style.module.scss";

const Hero:FC = () => {
  const { Title, Text } = Typography;
  return (
    <Row className={`${style.container} container centered`}>
      <Col className="centered">
        <Text>DON'T BE LATE</Text>
        <Title level={1}>Create a transaction today!</Title>
        <Text>Enjoy the ethereum network, create the future. Send and receive cryptocurrencies, trusted by 15M wallets.</Text>
        <Button className={style.btn}><a href="#form">Get Started</a></Button>
      </Col>
      <Col>
      <img src={heroImg} alt="Create transactions" className={style.img}/>
      </Col>
    </Row>
 );
};

export default Hero;

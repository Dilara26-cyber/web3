import { Layout } from "antd";
import React, { FC } from "react";

import FormComponent from "../Form";
import Hero from "../Hero";

const Main: FC = () => {
  const { Content } = Layout;
  return (
    <Content>
      <Hero />
      <FormComponent/>
    </Content>
  );
};

export default Main;

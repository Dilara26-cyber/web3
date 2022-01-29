import {
	Form,
	Input,
} from "antd";
import React, { FC } from "react";

import style from "./style.module.scss";

const FormComponent: FC = () => {
  const formFields = ["Address", "Amount(Eth)", "Keyword", "Enter Message"];
  return (
    <Form layout="vertical" className="container" id="form">
      {formFields.map((field) => (
        <Form.Item label={field} key={field}>
          <Input placeholder={field} />
        </Form.Item>
      ))}
    </Form>
  );
};

export default FormComponent;

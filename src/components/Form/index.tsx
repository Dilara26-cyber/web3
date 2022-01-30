import {
	Button,
	Form,
	Input,
} from "antd";
import React, {
	FC,
	useContext,
} from "react";

import { TransactionContext } from "../../context/Transactions";
import style from "./style.module.scss";

const FormComponent: FC = () => {
  const { form, onFinish, handleChange } = useContext(TransactionContext);
  const fields = [
    { label: "Address To", name: "addressTo", isUint: false },
    { label: "Amount(Eth)", name: "amount", isUint: true },
    { label: "Keyword", name: "keyword", isUint: false },
    { label: "Enter Message", name: "message", isUint: false },
  ];
  return (
    <Form
      layout="vertical"
      className="container"
      id="form"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      {fields.map((field) => (
        <Form.Item
          label={field.label}
          key={field.name}
          name={field.name}
          required
        >
          <Input
            placeholder={field.label}
            type={field.isUint ? "number" : "text"}
            step={field.isUint ? "0.1" : undefined}
            onChange={handleChange}
          />
        </Form.Item>
      ))}
      <Button htmlType="submit">Send</Button>
    </Form>
  );
};

export default FormComponent;

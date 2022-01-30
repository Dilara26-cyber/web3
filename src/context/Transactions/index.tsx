import { Form } from "antd";
import { ethers } from "ethers";
import React, {
	FC,
	useEffect,
	useState,
} from "react";

import {
	contractABI,
	contractAddress,
} from "../../utils/constants";

export const TransactionContext = React.createContext<any>(null);

const { ethereum } = window as any;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};

export const TransactionProvider = ({ children }: any) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [formFields, setFormFields] = useState({
    addressTo: "",
    amount: "",
    message: "",
    keyword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("count")
  );
  const [form] = Form.useForm();
  const showError = (error: any) => {
    console.log(error);
    throw new Error("No ethereum object.");
  };
  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No connection");
      }
    } catch (error) {
      showError(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      showError(error);
    }
  };
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");
      const { addressTo, amount, message, keyword } = formFields;
      const parsedAmount = ethers.utils.parseEther(amount);
      const contract = getContract();
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
            message: message,
            keyword: keyword,
          },
        ],
      });
      const transactionHex = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      await transactionHex.wait();
      setIsLoading(false);
      const transactionCount = await contract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      showError(error);
    }
  };
  const onFinish = (e: any) => {
    console.log(formFields);
    //e.preventDefault();
    sendTransaction();
  };
  const handleChange = () => setFormFields(form.getFieldsValue());
  useEffect(() => {
    checkWalletConnection();
  }, [form]);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        sendTransaction,
        form,
        onFinish,
        handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

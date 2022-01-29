import { Layout } from "antd";

import Main from "./components/Main";
import Navbar from "./components/Navbar";

const App = () => {
  return <Layout>
    <Navbar/>
    <Main/>
  </Layout>;
};

export default App;


import useWeb3Modal from "./functions/useWeb3Modal";
import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Projects } from "./pages/Projects";
import { EditProject } from "./pages/EditProject";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Message, MessageType, NetworkInfo } from "./consts/interfaces";
import { Messages } from "./components/Messages";
import { getNetworkInfo, networks } from "./consts/setup";

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(networks[0]);

  const addMessage = (message: string, type = MessageType.error, time = 10) => {
    setMessages((m) => [...m.filter((mes) => mes.type !== type), { message, type, time }]);
  };

  useEffect(() => {
    async function effect() {
      if (provider) {
        const chainId = (await provider?.getNetwork()).chainId;
        const info = getNetworkInfo(chainId);
        info ? setNetworkInfo(info) : addMessage("Wrong chain! Use Rinkeby", MessageType.network, 0);
      }
    }
    effect();
  }, [provider]);

  return (
    <Body>
      <Header provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      <Messages messages={messages} setMessages={setMessages} />
      <BrowserRouter>
        <Routes>
          <Route
            path="donate/:title"
            element={provider ? <Donate provider={provider} addMessage={addMessage} networkInfo={networkInfo} /> : <p>Connect wallet</p>}
          />
          <Route
            path="edit/:title"
            element={provider ? <EditProject provider={provider} addMessage={addMessage} networkInfo={networkInfo} /> : <p>Connect wallet</p>}
          />
          <Route
            path="new"
            element={provider ? <EditProject provider={provider} addMessage={addMessage} networkInfo={networkInfo} /> : <p>Connect wallet</p>}
          />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Body>
  );
}

export default App;

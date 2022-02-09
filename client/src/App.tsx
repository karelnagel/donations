import useWeb3Modal from "./functions/useWeb3Modal";
import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Projects } from "./pages/Projects";
import { EditProject } from "./pages/EditProject";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Message, MessageType, NetworkInfo, User } from "./consts/interfaces";
import { Messages } from "./components/Messages";
import { getNetworkInfo, networks } from "./consts/setup";
import { Context } from "./context";
import { Loading } from "./components/Loading";

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [network, setNetwork] = useState<NetworkInfo>(networks[0]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState("");
  const addMessage = (message: string, type = MessageType.error, time = 10) => {
    setMessages((m) => [...m.filter((mes) => mes.type !== type), { message, type, time }]);
  };

  useEffect(() => {
    async function effect() {
      if (provider) {
        const chainId = (await provider?.getNetwork()).chainId;
        const info = getNetworkInfo(chainId);
        info ? setNetwork(info) : addMessage("Wrong chain! Use Rinkeby!", MessageType.network, 0);
        const address = await provider.getSigner().getAddress();
        setUser((u) => ({ ...u, address }));
      }
    }
    effect();
  }, [provider]);

  return (
    <Context.Provider value={{ provider, network, addMessage, user, setLoading }}>
      <Body>
        {loading && <Loading loading={loading}/>}
        <Header provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        <Messages messages={messages} setMessages={setMessages} />
        <HashRouter>
          <Routes>
            <Route path="donate/:title" element={provider ? <Donate /> : <p>Connect wallet</p>} />
            <Route path="edit/:title" element={provider ? <EditProject /> : <p>Connect wallet</p>} />
            <Route path="new" element={provider ? <EditProject /> : <p>Connect wallet</p>} />
            <Route path="projects" element={<Projects />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </Body>
    </Context.Provider>
  );
}

export default App;

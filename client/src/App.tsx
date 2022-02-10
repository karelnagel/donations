import useWeb3Modal from "./hooks/useWeb3Modal";
import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { EditProject } from "./pages/EditProject";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Messages } from "./components/Messages";
import { getNetworkInfo, networks } from "./networks";
import { Context, defaultProvider, NetworkInfo, User } from "./interfaces/context";
import { Loading } from "./components/Loading";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getENS } from "./hooks/useFunctions";
import { Message, MessageType } from "./interfaces/message";

function App() {
  const [web3Provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [network, setNetwork] = useState<NetworkInfo>(networks[0]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState("");
  const [provider, setProvider] = useState<JsonRpcProvider>(defaultProvider);
  const addMessage = (message: string, type = MessageType.error, time = 10) => {
    setMessages((m) => [...m.filter((mes) => mes.type !== type), { message, type, time }]);
  };

  const load=async (asyncFunc:()=>Promise<void>,message:string):Promise<void>=>{
    setLoading(message)
    await asyncFunc()
    setLoading("")
  }
  useEffect(() => {
    async function effect() {
      // If user is logged in then it is useing web3provider and getting address
      if (web3Provider) {
        setProvider(web3Provider);
        const address = await web3Provider.getSigner().getAddress();
        const name = await getENS(web3Provider, address);
        setUser({ address, name });

        const chainId = (await web3Provider.getNetwork()).chainId;
        const info = getNetworkInfo(chainId);
        info ? setNetwork(info) : addMessage("Wrong chain! Use Rinkeby!", MessageType.network, 0);
      } else {
        setProvider(defaultProvider);
        setUser(undefined);
      }
    }
    effect();
  }, [web3Provider]);

  return (
    <Context.Provider value={{ provider, network, addMessage, user, load }}>
      <Body>
        {loading && <Loading loading={loading} />}
        <Header loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        <Messages messages={messages} setMessages={setMessages} />
        <HashRouter>
          <Routes>
            <Route path="donate/:title" element={<Donate />} />
            <Route path="edit/:title" element={<EditProject />} />
            <Route path="new" element={<EditProject />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </Body>
    </Context.Provider>
  );
}

export default App;

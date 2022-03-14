import useWeb3Modal from "./hooks/useWeb3Modal";
import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Messages } from "./components/Messages";
import { getNetworkInfo, defaultNetwork } from "./networks";
import { Context, defaultProvider, NetworkInfo, User } from "./interfaces/context";
import { Loading } from "./components/Loading";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Message, MessageType } from "./interfaces/message";
import { Progress } from "./pages/Progress";
import { LastDonation } from "./pages/LastDonation";
import { Projects } from "./pages/Projects";
import { useFunctions } from "./hooks/useFunctions";
import { Footer } from "./components/Footer";

function App() {
  const [web3Provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [network, setNetwork] = useState<NetworkInfo>(defaultNetwork);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState("");
  const [provider, setProvider] = useState<JsonRpcProvider>(defaultProvider);
  const { getENS } = useFunctions();
  const addMessage = (message: string, type = MessageType.error, time = 10) => {
    setMessages((m) => [...m.filter((mes) => mes.type !== type), { message, type, time }]);
  };

  const load = async (asyncFunc: () => Promise<void>, message: string): Promise<void> => {
    setLoading(message);
    await asyncFunc();
    setLoading("");
  };
  useEffect(() => {
    async function effect() {
      // If user is logged in then it is useing web3provider and getting address
      if (web3Provider) {
        setProvider(web3Provider);
        const address = await web3Provider.getSigner().getAddress();
        const name = await getENS(address);
        setUser({ address, name });

        const chainId = (await web3Provider.getNetwork()).chainId;
        const info = getNetworkInfo(chainId);

        if (info) {
          setNetwork(info);
        } else {
          setProvider(defaultProvider);
          addMessage("Wrong chain! Use Polygon!", MessageType.network, 0);
        }
      } else {
        setProvider(defaultProvider);
        setUser(undefined);
      }
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Provider]);

  return (
    <HashRouter>
      <Context.Provider value={{ provider, network, addMessage, user, load }}>
        <Routes>
          <Route path=":title/progress" element={<Progress />} />
          <Route path=":title/donations" element={<LastDonation />} />
          <Route
            path="*"
            element={
              <Body>
                {loading && <Loading loading={loading} />}
                <Header loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
                <Messages messages={messages} setMessages={setMessages} />
                <Routes>
                  <Route path="new" element={<Project edit={true} />} />
                  <Route path="projects" element={<Projects count={10} />} />
                  <Route path=":title" element={<Project />} />
                  <Route path=":title/edit" element={<Project edit={true} />} />
                  <Route path="new" element={<Project edit={true} />} />
                  <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
              </Body>
            }
          />
        </Routes>
      </Context.Provider>
    </HashRouter>
  );
}

export default App;

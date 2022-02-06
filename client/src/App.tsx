import useWeb3Modal from "./functions/useWeb3Modal";
import { useEffect } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Projects } from "./pages/Projects";
import { EditProject } from "./pages/EditProject";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  useEffect(() => {
    async function start() {
      if (provider) {
      }
    }
    start();
  }, [provider]);

  return (
    <div>
      <Body>
        <Header provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        <BrowserRouter>
          <Routes>
            <Route path="donate/:title" element={provider ? <Donate provider={provider!}/>: <p>Connect wallet</p>} />
            <Route path="edit/:title" element={provider ? <EditProject provider={provider} /> : <p>Connect wallet</p>} />
            <Route path="new" element={provider ? <EditProject provider={provider} /> : <p>Connect wallet</p>} />
            <Route path="projects" element={<Projects />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Body>
    </div>
  );
}

export default App;

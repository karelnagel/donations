import useWeb3Modal from "./hooks/useWeb3Modal";
import { useEffect } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { Projects } from "./pages/Projects";
import { EditProject } from "./pages/EditProject";

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
        {false && <Home/>}
        {true && <Donate/>}
        {false && <EditProject project={1}/>}
        {false && <Projects user={''}/>}
      </Body>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <p>Home page</p>
      <p>100% decentralized</p>
      <p>opensource</p>
      <p>No commission</p>
      <p>working on polygon</p>
      <p>works with any erc20</p>
      <p>obs support</p>
      <p>easy to use</p>
      <p>users get nft with a donation what helps creators to give back to community or users to flex with their nft</p>
      <p>You can design your nft</p>
      <p>The smart contracts aren't audited so use at your own risk</p>
      <button className="button">
        <Link to={"/new"}>Create new project</Link>
      </button>
      <button className="button">
        <Link to={"/karel"}>Help this project / Example</Link>
      </button>
    </div>
  );
}

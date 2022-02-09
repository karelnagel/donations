import { Link } from "react-router-dom";

export function Home(){
  return (
    <div>
      <p>Home page</p>
      <button className="button">
        <Link to={"/new"}>Create new project</Link>
      </button>
      <button className="button">
        <Link to={"/donate/karel"}>Help this project / Example</Link>
      </button>
     </div>
  );
}

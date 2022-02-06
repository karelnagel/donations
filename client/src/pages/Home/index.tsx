import { Link } from "react-router-dom";

export function Home(){
  return (
    <div>
      <p>Home page</p>
      <button>
        <Link to={"/new"}>Create new project</Link>
      </button>
     </div>
  );
}

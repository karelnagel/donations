import { ProgressBar } from "../../components/ProgressBar";
import { useProjects } from "../../hooks/useProjects";

export function Progress(){
const {project,coin}=useProjects()
  return (
   <ProgressBar balance={project.balance} goal={project.goal} coin={coin!}/>
  );
}

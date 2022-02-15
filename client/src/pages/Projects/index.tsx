import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import { useFunctions } from "../../hooks/useFunctions";
import { getProjectStyle } from "../../hooks/useIPFS";
import { Context } from "../../interfaces/context";
import { Project, ProjectStyle } from "../../interfaces/project";
import styles from "./styles.module.css";

import { Image } from "../../components/Image";
import { Spacer } from "../../components/Spacer";
export function Projects() {
  const { getProjectsCount, getProject } = useFunctions();
  const { addMessage } = useContext(Context);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    async function effect() {
      const result = await getProjectsCount();
      if (result.error) return addMessage(result.error);
      const last = result.result!;
      for (let i = last; i > last - 10; i--) {
        if (i <= 0) break;
        const project = await getProject(i);
        if (project.error) return addMessage(project.error);
        setProjects((p) => [...p, project.result!]);
      }
    }
    effect();
    return setProjects([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.projects}>
        <Spacer height="15px" />
        <p className={styles.title}>Latest projects</p>
        {projects.map((p, i) => (
          <ProjectBox key={i} project={p} />
        ))}
        <Link to="/new">
          <button className="button">Create new project</button>
        </Link>
      </div>
    </div>
  );
}

function ProjectBox({ project }: { project: Project }) {
  const { network, addMessage } = useContext(Context);
  const coin = network.coins.find((c) => c.value === project.coin)?.label ?? "ERC20";
  const [style, setStyle] = useState<ProjectStyle>();

  useEffect(() => {
    async function effect() {
      const result = await getProjectStyle(project.uri);
      if (result.error) return addMessage(result.error);
      setStyle(result.result!);
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className={styles.project}>
      <Link to={`/${project.title}`}>
        {!style ? (
          <p className={styles.name}>{project.title}</p>
        ) : (
          <div className={styles.flex}>
            <Image image={style.image} />
            <div className={styles.texts}>
              <p className={styles.name}>{style.name}</p>
              <p className={styles.description}>{style.description}</p>
            </div>
          </div>
        )}
        <ProgressBar balance={project.balance} goal={project.goal} coin={coin} />
      </Link>
    </div>
  );
}

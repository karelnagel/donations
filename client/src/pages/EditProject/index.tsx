import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editProject, end, getProject, getProjectId, startProject } from "../../functions/contract";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { coins } from "../../consts/coins";
import { getProjectObj, upload } from "../../functions/ipfs";
import { ProjectObj } from "../../consts/interfaces";

export function EditProject(props: { provider: Web3Provider }) {
  const paramsTitle = useParams().title;

  const navigate = useNavigate();
  const routeToEditPage = useCallback((page) => navigate(page, { replace: true }), [navigate]);

  const [projectId, setProjectId] = useState(0);
  const [balance, setBalance] = useState(0);

  const [title, setTitle] = useState("");
  const [coin, setCoin] = useState("");
  const [goal, setGoal] = useState(0);
  const [active, setActive] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

  const [img, setImg] = useState<any>();
  const [projectObj, setProjectObj] = useState<ProjectObj>({});

  useEffect(() => {
    const effect = async () => {
      if (paramsTitle) {
        setProjectId(await getProjectId(props.provider, paramsTitle));

        if (projectId) {
          setTitle(paramsTitle);
          const project = await getProject(props.provider, projectId);
          setCoin(project.coin);
          setGoal(project.goal);
          setBalance(project.balance);
          setActive(project.active);
          setIsOwner(project.owner === (await props.provider.getSigner().getAddress()));

          setProjectObj(await getProjectObj(project.uri));
        }
      }
    };
    effect();
  }, [paramsTitle, projectId, props.provider]);

  const edit = async () => {
    const uri = await upload(projectObj, img);

    console.log(uri);
    if (projectId) {
      await editProject(props.provider, projectId, goal, uri);
    } else {
      await startProject(props.provider, coin, title, goal, uri);
      routeToEditPage(`/edit/${title}`);
    }
    console.log("success");
  };

  const buttonEnd = async () => {
    if (projectId) {
      await end(props.provider, projectId);
      setActive(false);
      setBalance(0);
    }
    console.log("success");
  };

  if (!isOwner) return <p>Not owner</p>;
  return (
    <div className={styles.content}>
      {!active && <p>This project has ended</p>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!!paramsTitle} />
      <input type="number" placeholder="Goal" value={goal} onChange={(e) => setGoal(Number(e.target.value))} disabled={!active} />
      <Dropdown options={coins} onChange={(e) => setCoin(e.value)} value={coin} placeholder="Select an option" disabled={!!paramsTitle} />
      <br />

      <input type="file" onChange={(event) => setImg(event.target.files![0])} />
      <input
        type="text"
        placeholder="Name"
        value={projectObj.name}
        onChange={(e) => setProjectObj({ ...projectObj, name: e.target.value })}
        disabled={!active}
      />
      <input
        type="text"
        placeholder="Description"
        value={projectObj.description}
        onChange={(e) => setProjectObj({ ...projectObj, description: e.target.value })}
        disabled={!active}
      />
      <input
        type="number"
        placeholder="Donation default"
        value={projectObj.donationDefault}
        onChange={(e) => setProjectObj({ ...projectObj, donationDefault: Number(e.target.value) })}
        disabled={!active}
      />
      <input
        type="text"
        placeholder="Donation options"
        value={projectObj.donationOptions?.join(",")}
        onChange={(e) => setProjectObj({ ...projectObj, donationOptions: e.target.value.split(",").map((x) => Number(x)) })}
        disabled={!active}
      />
      <div>
        <input
          type="text"
          placeholder="Website"
          value={projectObj.external_url}
          onChange={(e) => setProjectObj({ ...projectObj, external_url: e.target.value })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Twitter"
          value={projectObj.links?.twitter}
          onChange={(e) => setProjectObj({ ...projectObj, links: { ...projectObj.links, twitter: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Instagram"
          value={projectObj.links?.instagram}
          onChange={(e) => setProjectObj({ ...projectObj, links: { ...projectObj.links, instagram: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Opensea"
          value={projectObj.links?.opensea}
          onChange={(e) => setProjectObj({ ...projectObj, links: { ...projectObj.links, opensea: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Youtube"
          value={projectObj.links?.youtube}
          onChange={(e) => setProjectObj({ ...projectObj, links: { ...projectObj.links, youtube: e.target.value } })}
          disabled={!active}
        />
      </div>

      <br />
      <button onClick={edit} disabled={!active}>
        {!!paramsTitle ? "Edit" : "Start"}
      </button>
      {!!paramsTitle && (
        <button onClick={buttonEnd} disabled={!active}>
          End project and collect {balance}
        </button>
      )}
      {!!paramsTitle && (
        <button>
          <Link to={"/donate/" + title}>View project</Link>
        </button>
      )}
    </div>
  );
}

import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editProject, editToken, end, getProject, getProjectId, getTokenUri, startProject } from "../../functions/contract";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { coins } from "../../consts/coins";
import styleExample from "../../consts/style.json";
import tokenExample from "../../consts/token.json";
import { getJson, uploadJson } from "../../functions/ipfs";

export function EditProject(props: { provider: Web3Provider }) {
  const paramsTitle = useParams().title;

  const navigate = useNavigate();
  const routeToEditPage = useCallback((page) => navigate("/edit/" + page, { replace: true }), [navigate]);

  const [title, setTitle] = useState("");
  const [coin, setCoin] = useState("");
  const [style, setStyle] = useState(JSON.stringify(styleExample, null, 2));
  const [token, setToken] = useState(JSON.stringify(tokenExample, null, 2));
  const [goal, setGoal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [active, setActive] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

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
          setIsOwner(project.owner===await props.provider.getSigner().getAddress())

          const styleJson = await getJson(project.styling);
          setStyle(JSON.stringify(styleJson, null, 2));

          const tokenUri = await getTokenUri(props.provider, projectId);
          const tokenJson = await getJson(tokenUri);
          setToken(JSON.stringify(tokenJson, null, 2));
        }
      }
    };
    effect();
  }, [paramsTitle, projectId, props.provider]);

  const edit = async () => {
    const [tokenUri, styleUri] = await uploadJson([token, style]);

    console.log({ styleUri, tokenUri });
    if (projectId) {
      await editToken(props.provider, projectId, tokenUri);
      await editProject(props.provider, projectId, goal, styleUri);
    } else {
      await startProject(props.provider, coin, title, goal, styleUri, tokenUri);
      routeToEditPage(title);
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
  if (!isOwner) return <p>Not owner</p>
  return (
    <div className={styles.content}>
      {!active && <p>This project has ended</p>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!!paramsTitle} />
      <input type="number" placeholder="Goal" value={goal} onChange={(e) => setGoal(Number(e.target.value))} disabled={!active} />
      <textarea placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} disabled={!active} />
      <textarea placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} disabled={!active} />
      <Dropdown options={coins} onChange={(e) => setCoin(e.value)} value={coin} placeholder="Select an option" disabled={!!paramsTitle} />

      <button onClick={edit} disabled={!active}>
        Edit
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

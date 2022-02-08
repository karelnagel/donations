import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editProject, end, getProject, getProjectId, startProject } from "../../functions/contract";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { getProjectStyle, upload } from "../../functions/ipfs";
import { MessageType, NetworkInfo, ProjectStyle } from "../../consts/interfaces";

export function EditProject({
  provider,
  addMessage,
  networkInfo
}: {
  provider: Web3Provider;
  networkInfo:NetworkInfo;
  addMessage: (message: string, type?: MessageType, time?: number | undefined) => void;
}) {
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
  const [style, setStyle] = useState<ProjectStyle>({});

  useEffect(() => {
    const effect = async () => {
      if (paramsTitle) {
        const getId = await getProjectId(provider, paramsTitle);
        getId.result ? setProjectId(getId.result) : addMessage(getId.error!);

        if (projectId) {
          setTitle(paramsTitle);

          const getProj = await getProject(provider, projectId);
          if (!getProj.result) addMessage(getProj.error!);
          else {
            setCoin(getProj.result.coin);
            setGoal(getProj.result.goal);
            setBalance(getProj.result.balance);
            setActive(getProj.result.active);
            setIsOwner(getProj.result.owner === (await provider.getSigner().getAddress()));

            const getStyle = await getProjectStyle(getProj.result.uri);
            getStyle.result ? setStyle(getStyle.result) : addMessage(getStyle.error!);
          }
        }
      }
    };
    effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsTitle, projectId, provider]);

  const edit = async () => {
    const upl = await upload(style, img);
    if (upl.result) {
      console.log(upl);
      if (projectId) {
        const editProj = await editProject(provider, projectId, goal, upl.result);
        if (editProj.error) addMessage(editProj.error!);
      } else {
        const startProj = await startProject(provider, coin, title, goal, upl.result);
        !startProj.error ? routeToEditPage(`/edit/${title}`) : addMessage(startProj.error!);
      }
    } else addMessage(upl.error!);
  };

  const buttonEnd = async () => {
    if (projectId) {
      await end(provider, projectId);
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
      <Dropdown options={networkInfo.coins} onChange={(e) => setCoin(e.value)} value={coin} placeholder="Select an option" disabled={!!paramsTitle} />
      <br />

      <input type="file" onChange={(event) => setImg(event.target.files![0])} />
      <input type="text" placeholder="Name" value={style.name} onChange={(e) => setStyle({ ...style, name: e.target.value })} disabled={!active} />
      <input
        type="text"
        placeholder="Description"
        value={style.description}
        onChange={(e) => setStyle({ ...style, description: e.target.value })}
        disabled={!active}
      />
      <input
        type="number"
        placeholder="Donation default"
        value={style.donationDefault}
        onChange={(e) => setStyle({ ...style, donationDefault: Number(e.target.value) })}
        disabled={!active}
      />
      <input
        type="text"
        placeholder="Donation options"
        value={style.donationOptions?.join(",")}
        onChange={(e) => setStyle({ ...style, donationOptions: e.target.value.split(",").map((x) => Number(x)) })}
        disabled={!active}
      />
      <div>
        <input
          type="text"
          placeholder="Website"
          value={style.external_url}
          onChange={(e) => setStyle({ ...style, external_url: e.target.value })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Twitter"
          value={style.links?.twitter}
          onChange={(e) => setStyle({ ...style, links: { ...style.links, twitter: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Instagram"
          value={style.links?.instagram}
          onChange={(e) => setStyle({ ...style, links: { ...style.links, instagram: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Opensea"
          value={style.links?.opensea}
          onChange={(e) => setStyle({ ...style, links: { ...style.links, opensea: e.target.value } })}
          disabled={!active}
        />
        <input
          type="text"
          placeholder="Youtube"
          value={style.links?.youtube}
          onChange={(e) => setStyle({ ...style, links: { ...style.links, youtube: e.target.value } })}
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

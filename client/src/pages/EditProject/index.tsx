import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useReadFunctions } from "../../functions/contractRead";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { getProjectStyle, upload } from "../../functions/ipfs";
import { MessageType, ProjectStyle } from "../../consts/interfaces";
import { Context } from "../../context";
import { useWriteFunctions } from "../../functions/contractWrite";

export function EditProject() {
  const { provider, network, addMessage, setLoading, user } = useContext(Context);
  const { getProject, getProjectId } = useReadFunctions();
  const { editProject, end, startProject } = useWriteFunctions();
  const paramsTitle = useParams().title;

  const navigate = useNavigate();
  const routeToEditPage = useCallback((page) => navigate(page, { replace: true }), [navigate]);

  const [projectId, setProjectId] = useState(0);
  const [balance, setBalance] = useState(0);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [coin, setCoin] = useState("");
  const [goal, setGoal] = useState(0);
  const [active, setActive] = useState(true);
  const [owner, setOwner] = useState("");

  const [img, setImg] = useState<any>();
  const [style, setStyle] = useState<ProjectStyle>({});

  useEffect(() => {
    const effect = async () => {
      setLoading!("Loading content");
      if (paramsTitle && provider) {
        const getId = await getProjectId(paramsTitle);
        getId.result ? setProjectId(getId.result) : addMessage(getId.error!);

        if (projectId) {
          setTitle(paramsTitle);

          const getProj = await getProject(projectId);
          if (!getProj.result) addMessage(getProj.error!);
          else {
            setCoin(getProj.result.coin);
            setGoal(getProj.result.goal);
            setBalance(getProj.result.balance);
            setActive(getProj.result.active);
            setOwner(getProj.result.owner);

            const getStyle = await getProjectStyle(getProj.result.uri);
            getStyle.result ? setStyle(getStyle.result) : addMessage(getStyle.error!);
          }
        }
      }
      setLoading!("");
    };
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsTitle, projectId, provider]);

  const edit = async () => {
    setLoading!("Uploading your project!");
    const upl = await upload(style, img);
    if (upl.result) {
      if (projectId) {
        const editProj = await editProject(projectId, goal, upl.result);
        if (editProj.error) addMessage(editProj.error!);
        else {
          addMessage("Project successfully uploaded!", MessageType.success);
        }
      } else {
        const startProj = await startProject(coin, title, goal, upl.result);
        if (startProj.error) addMessage(startProj.error!);
        else {
          routeToEditPage(`/edit/${title}`);
          addMessage("Project successfully uploaded!", MessageType.success);
        }
      }
    } else addMessage(upl.error!);
    setLoading!("");
  };

  const buttonEnd = async () => {
    setLoading!("Ending project");
    if (projectId) {
      const e = await end(projectId);
      if (e.error) addMessage(e.error);
      else {
        setActive(false);
        setBalance(0);
        addMessage("Project ended successfully!", MessageType.success);
      }
    }
    setLoading!("");
  };

  const setTitleHandler = async (e: any) => {
    setTitle(e.target.value);
    const projectId = await getProjectId(e.target.value);
    if (projectId.result && projectId.result > 0) setTitleError("Title already taken");
    else if (!e.target.value) setTitleError("Title is required!");
    else setTitleError("");
  };
  if (!user) return <p>Please login to create new project or edit</p>;
  else if (user.address!==owner && paramsTitle) return <p>Not owner</p>;
  return (
    <div className={styles.content}>
      {!active && <p className={styles.errorMessage}>This project has ended</p>}
      {titleError && <p>{titleError}</p>}
      <input type="text" placeholder="Title" value={title} onChange={setTitleHandler} disabled={!!paramsTitle} />
      <input type="number" placeholder="Goal" value={goal} onChange={(e) => setGoal(Number(e.target.value))} disabled={!active} />
      <Dropdown options={network.coins} onChange={(e) => setCoin(e.value)} value={coin} placeholder="Select an option" disabled={!!paramsTitle} />
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
      <button className="button" onClick={edit} disabled={!active}>
        {!!paramsTitle ? "Edit" : "Start"}
      </button>
      {!!paramsTitle && (
        <button className="button" onClick={buttonEnd} disabled={!active}>
          End project and collect {balance}
        </button>
      )}
      {!!paramsTitle && (
        <button className="button">
          <Link to={"/donate/" + title}>View project</Link>
        </button>
      )}
    </div>
  );
}

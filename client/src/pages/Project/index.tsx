import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import {} from "../../networks";
import { Context } from "../../interfaces/context";
import { Icon } from "./Icon";
import { ProgressBar } from "../../components/ProgressBar";
import { useProjects } from "../../hooks/useProjects";
import { Input } from "./Input";
import Dropdown from "react-dropdown";

export function Project({ edit = false }) {
  const { network, addMessage, user } = useContext(Context);
  const { getCoinBalance } = useFunctions();
  const { project, style, makeDonation, setStyle, setProject, id, save, end, setTitle, imageUpload, coin } = useProjects();
  const [userBalance, setUserBalance] = useState(0);
  const [donation, setDonation] = useState(0);
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function effect() {
      if (project.coin && user?.address) {
        const getBalance = await getCoinBalance(project.coin, user.address);
        getBalance.result ? setUserBalance(getBalance.result) : addMessage(getBalance.error!);
      }
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, user]);
  useEffect(() => {
    setDonation(style.donationDefault);
  }, [style.donationDefault]);

  if (!user && edit) return <p>Connect wallet to edit or add new project</p>;
  return (
    <div className={styles.content}>
      {!project.active && <p>This project ended</p>}

      {edit && !id && (
        <div>
          <Input
            value={project.title}
            onChange={async (e) => {
              const result = await setTitle(e);
              result.error ? setTitleError(result.error) : setTitleError("");
            }}
          />
          <p>{titleError}</p>
        </div>
      )}
      {edit && !id && <Dropdown options={network.coins} onChange={(e) => setProject((p) => ({ ...p, coin: e.value }))} />}
      {edit && <Input value={project.goal} isNumber={true} onChange={(e) => setProject((p) => ({ ...p, goal: Number(e.target.value) }))} />}

      <div
        className={styles.imageBorder}
        onClick={() => {
          if (edit) inputFile.current!.click();
        }}
      >
        <img className={styles.image} src={style.image} alt="a" />
      </div>

      <Input className={styles.name} value={style.name} edit={edit} onChange={(e) => setStyle((s) => ({ ...s, name: e.target.value }))} />
      <Input
        className={styles.description}
        value={style.description}
        edit={edit}
        onChange={(e) => setStyle((s) => ({ ...s, description: e.target.value }))}
      />

      <Input
        className={styles.website}
        value={style.external_url}
        edit={edit}
        onClick={() => window.open(style.external_url, "_blank")}
        onChange={(e) => setStyle((s) => ({ ...s, external_url: e.target.value }))}
      />

      <div className={styles.icons}>
        <Icon
          edit={edit}
          url={style.links.twitter}
          icon="twitter"
          onChange={(e) => setStyle((s) => ({ ...s, links: { ...s.links, twitter: e.target.value } }))}
        />
        <Icon
          edit={edit}
          url={style.links.instagram}
          icon="instagram"
          onChange={(e) => setStyle((s) => ({ ...s, links: { ...s.links, instagram: e.target.value } }))}
        />
        <Icon
          edit={edit}
          url={style.links.youtube}
          icon="youtube"
          onChange={(e) => setStyle((s) => ({ ...s, links: { ...s.links, youtube: e.target.value } }))}
        />
        <Icon
          edit={edit}
          url={style.links.opensea}
          icon="opensea"
          onChange={(e) => setStyle((s) => ({ ...s, links: { ...s.links, opensea: e.target.value } }))}
        />
      </div>
      <ProgressBar balance={project.balance} goal={project.goal} coin={coin!} />

      {!user && <p>Login to donate</p>}
      {!project.active && <p>Project not active</p>}
      {user && project.active && (
        <div>
          <input
            type="number"
            placeholder="Donation"
            value={donation}
            onChange={(e) => (edit ? setStyle((s) => ({ ...s, donationDefault: Number(e.target.value) })) : setDonation(Number(e.target.value)))}
            className={styles.input}
          />
          {style.donationOptions && (
            <div className={styles.donations}>
              <Input
                className={styles.donationOption}
                value={style.donationOptions[0]}
                edit={edit}
                isNumber={true}
                onClick={() => setDonation(style.donationOptions[0])}
                onChange={(e) =>
                  setStyle((s) => ({ ...s, donationOptions: [Number(e.target.value), style.donationOptions[1], style.donationOptions[2]] }))
                }
              />
              <Input
                className={styles.donationOption}
                value={style.donationOptions[1]}
                edit={edit}
                isNumber={true}
                onClick={() => setDonation(style.donationOptions[1])}
                onChange={(e) =>
                  setStyle((s) => ({ ...s, donationOptions: [style.donationOptions[0], Number(e.target.value), style.donationOptions[2]] }))
                }
              />
              <Input
                className={styles.donationOption}
                value={style.donationOptions[2]}
                edit={edit}
                isNumber={true}
                onClick={() => setDonation(style.donationOptions[2])}
                onChange={(e) =>
                  setStyle((s) => ({ ...s, donationOptions: [style.donationOptions[0], style.donationOptions[1], Number(e.target.value)] }))
                }
              />
              <p className={styles.donationOption} onClick={() => (edit ? setDonation(userBalance) : null)}>
                {userBalance}
              </p>
            </div>
          )}
          <br />

          <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className={styles.input} />

          {!edit && (
            <button onClick={() => makeDonation(donation, message)} className="button">
              Donate
            </button>
          )}
          {!edit && project.owner === user?.address && (
            <Link to={"edit/"}>
              <button className="button">Edit</button>
            </Link>
          )}

          {edit && (
            <button onClick={save} className="button">
              {id ? "Edit" : "Start"}
            </button>
          )}
          {edit && (
            <Link to={`/${project.title}`}>
              <button className="button">Back</button>
            </Link>
          )}
          {edit && !!id && (
            <button className="button" onClick={end}>
              End
            </button>
          )}
        </div>
      )}
      <input onChange={imageUpload} type="file" id="file" ref={inputFile} style={{ display: "none" }} />
    </div>
  );
}

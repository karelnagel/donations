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
import { Spacer } from "../../components/Spacer";
import { Image } from "../../components/Image";
import { DonationMessage } from "../../components/DonationMessage";

export function Project({ edit = false }) {
  const { network, addMessage, user } = useContext(Context);
  const { getCoinBalance } = useFunctions();
  const { project, style, openseaUrl, makeDonation, setStyle, setProject, id, save, end, setTitle, imageUpload, coin,lastDonation } = useProjects();
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
      <div className={styles.donationMessage}>
      <DonationMessage donation={lastDonation}/>
      </div>
      <Spacer height="100px" />

      <Image
        onClick={() => {
          if (edit) inputFile.current!.click();
          else window.open(openseaUrl(), "_blank");
        }}
        edit={edit}
        image={style.image}
      />
      <Spacer height="30px" />
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
      <Spacer height="20px" />

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
      <Spacer height="20px" />

      {!edit && <ProgressBar balance={project.balance} goal={project.goal} coin={coin!} />}

      <Spacer height="10px" />
      {!edit && (
        <p className={styles.owner}>
          by:{" "}
          <a className={styles.ownerName} href={network.etherscan + project.owner}>
            {project.ownerName}
          </a>
        </p>
      )}
      {!edit && <Spacer height="60px" />}

      {!user && <p>Connect wallet to donate</p>}
      {!project.active && <p>Project not active</p>}
      {user && project.active && (
        <div className={styles.donation}>
          {edit && !id && (
            <label>
              Url route
              <input
                className={styles.input}
                value={project.title}
                onChange={async (e) => {
                  const result = await setTitle(e);
                  result.error ? setTitleError(result.error) : setTitleError("");
                }}
              />
              <p>{titleError}</p>
              <Spacer height="10px" />
            </label>
          )}

          {edit && !id && (
            <label>
              Select coin
              <Dropdown className={styles.dropdown} options={network.coins} onChange={(e) => setProject((p) => ({ ...p, coin: e.value }))} />
              <Spacer height="10px" />
            </label>
          )}
          {edit && (
            <label>
              Project goal
              <input
                type="number"
                className={styles.input}
                value={project.goal}
                onChange={(e) => setProject((p) => ({ ...p, goal: Number(e.target.value) }))}
              />
              <Spacer height="10px" />
            </label>
          )}

          {!edit && (
            <input
              type="number"
              placeholder="Donation"
              value={donation}
              onChange={(e) => setDonation(Number(e.target.value))}
              className={styles.input}
              disabled={edit}
            />
          )}
          {!edit && <Spacer height="10px" />}
          {style.donationOptions && (
            <div className={styles.donationOptions}>
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
              {!edit && (
                <p className={styles.donationOption} onClick={() => setDonation(userBalance)}>
                  MAX
                </p>
              )}
            </div>
          )}
          <Spacer height="10px" />
          {!edit && (
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.input}
              disabled={edit}
            />
          )}
          <Spacer height="60px" />

          {!edit && (
            <div>
              <button onClick={() => makeDonation(donation, message)} className="button">
                Donate
              </button>
              <Spacer height="10px" />

              {project.owner === user?.address && (
                <div>
                  <Link to={"edit/"}>
                    <button className="button">Edit</button>
                  </Link>
                  <Spacer height="10px" />
                  <button className={"button"} onClick={() => navigator.clipboard.writeText(`${window.location.href}/progress`)}>
                    Copy progress screen link
                  </button>
                  <Spacer height="10px" />
                  <button className={"button"} onClick={() => navigator.clipboard.writeText(`${window.location.href}/donations`)}>
                    Copy new donation link
                  </button>
                </div>
              )}
            </div>
          )}

          {edit && (
            <div>
              <div className={styles.twoButtons}>
                <button onClick={save} className="button">
                  {id ? "Edit" : "Start"}
                </button>
                {!!id && <Spacer width="10px" />}
                {!!id && (
                  <button className="button" onClick={end}>
                    End
                  </button>
                )}
              </div>
              <Spacer height="10px" />

              <Link to={`/${project.title}`}>
                <button className="button">Back</button>
              </Link>
            </div>
          )}
        </div>
      )}
      <Spacer height="40px" />
      <input onChange={imageUpload} type="file" id="file" ref={inputFile} style={{ display: "none" }} />
    </div>
  );
}

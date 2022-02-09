import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFunctions } from "../../functions/contract";
import { ethers } from "ethers";
import { getProjectStyle } from "../../functions/ipfs";
import { MessageType, Project, ProjectStyle } from "../../consts/interfaces";
import {} from "../../consts/setup";
import { Context } from "../../context";

export function Donate() {
  const { provider, network, addMessage } = useContext(Context);
  const { contract, donate, getCoinBalance, getProject, getProjectId } = useFunctions();
  let title = useParams().title;
  const [projectId, setProjectId] = useState(0);
  const [project, setProject] = useState<Project>({ balance: 0, goal: 0, active: true, owner: "", coin: "", uri: "" });
  const [style, setStyle] = useState<ProjectStyle>({});
  const [user, setUser] = useState<{ address: string; balance: number }>();
  const [donation, setDonation] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const coin = project ? network.coins.find((c) => c.value === project.coin)?.label : "";

  useEffect(() => {
    const con = contract();
    con.on(con.filters.Donation(projectId), (id, sender, amount, message) => {
      amount = Number(ethers.utils.formatEther(amount));
      addMessage!(`${sender} donated ${amount}! "${message}""`, MessageType.donation);
      setProject((p) => ({ ...p, balance: p.balance + amount }));
    });
    return () => {
      con.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, provider]);

  useEffect(() => {
    async function effect() {
      if (provider && title) {
        const getId = await getProjectId(title);
        getId.result ? setProjectId(getId.result) : addMessage!(getId.error!);

        const getProj = await getProject(projectId);
        getProj.result ? setProject(getProj.result) : addMessage!(getProj.error!);

        if (project.uri) {
          const getStyle = await getProjectStyle(project.uri);
          if (getStyle.result) {
            setDonation(getStyle.result.donationDefault!);
            setStyle(getStyle.result);
          } else addMessage!(getStyle.error!);
        }
        const address = await provider.getSigner().getAddress();
        if (project.coin && address) {
          const getBalance = await getCoinBalance(project.coin, address);
          getBalance.result ? setUser({ address, balance: getBalance.result }) : addMessage!(getBalance.error!);
        }
        setLoading(false);
      }
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.coin, project.uri, projectId, provider, title]);

  const makeDonation = async () => {
    const don = await donate(projectId, donation, message, project.coin);
    if (don.error) addMessage!(don.error);
  };
  const progress = (project.balance / project.goal) * 100;
  if (projectId && !loading) {
    return (
      <div className={styles.content}>
        {!project.active && <p>This project ended</p>}
        <div className={styles.imageBorder}>
          <img className={styles.image} src={style!.image} alt="a" />
        </div>
        <p className={styles.text1}>{style.name}</p>
        <p className={styles.text2}>{style.description}</p>
        {style.external_url && (
          <a href={style.external_url} className={styles.website}>
            {style.external_url.replace(/^https?:\/\//, "")}
          </a>
        )}
        <div className={styles.icons}>
          {style.links?.twitter && (
            <a href={style.links.twitter}>
              <img src="/icons/twitter.png" alt="twitter" />
            </a>
          )}
          {style.links?.instagram && (
            <a href={style.links.instagram}>
              <img src="/icons/instagram.png" alt="instagram" />
            </a>
          )}
          {style.links?.youtube && (
            <a href={style.links.youtube}>
              <img src="/icons/youtube.png" alt="youtube" />
            </a>
          )}
          {style.links?.opensea && (
            <a href={style.links.opensea}>
              <img src="/icons/opensea.png" alt="opensea" />
            </a>
          )}
        </div>
        <div>
          <p className={styles.goalText}>
            {project.balance} {coin} of {project.goal} {coin}
          </p>
          <div className={styles.goal}>
            <div className={styles.progress} style={{ width: `${progress < 100 ? progress : "100"}%`, borderRadius: "5px" }}></div>
          </div>
          <p>{progress}% finished</p>
        </div>
        <input
          type="number"
          placeholder="Donation"
          value={donation}
          onChange={(e) => setDonation(Number(e.target.value))}
          disabled={!project.active}
        />
        {style.donationOptions && (
          <div className={styles.donations}>
            <span onClick={() => setDonation(style.donationOptions![0])}>{style.donationOptions[0]}</span>
            <span onClick={() => setDonation(style.donationOptions![1])}>{style.donationOptions![1]}</span>
            <span onClick={() => setDonation(style.donationOptions![2])}>{style.donationOptions![2]}</span>
            <span onClick={() => setDonation(user?.balance!)}>{user?.balance}</span>
          </div>
        )}
        <br />
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} disabled={!project.active} />
        <button onClick={makeDonation} disabled={!project.active} className="button">
          Donate
        </button>
        {project.owner === user?.address && (
          <button disabled={!project.active} className="button">
            <Link to={"/edit/" + title}>Edit</Link>
          </button>
        )}
      </div>
    );
  } else if (loading) return <p>Loading ...</p>;
  else return <p>No project</p>;
}

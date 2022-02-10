import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getENS, useReadFunctions } from "../../functions/contractRead";
import { ethers } from "ethers";
import { getProjectStyle } from "../../functions/ipfs";
import { MessageType, Project, ProjectStyle } from "../../consts/interfaces";
import {} from "../../consts/setup";
import { Context } from "../../context";
import { useWriteFunctions } from "../../functions/contractWrite";

export function Donate() {
  const { provider, network, addMessage, setLoading, user } = useContext(Context);
  const { contract, getCoinBalance, getProject, getProjectId } = useReadFunctions();
  const { donate } = useWriteFunctions();

  let title = useParams().title;

  const [projectId, setProjectId] = useState(0);
  const [project, setProject] = useState<Project>({ balance: 0, goal: 0, active: true, owner: "", coin: "", uri: "" });
  const [style, setStyle] = useState<ProjectStyle>({});
  const [userBalance, setUserBalance] = useState(0);
  const [donation, setDonation] = useState(0);
  const [message, setMessage] = useState("");

  const coin = project ? network.coins.find((c) => c.value === project.coin)?.label : "";

  useEffect(() => {
    const effect = async (id: string, sender: string, amount: number, message: string) => {
      amount = Number(ethers.utils.formatEther(amount));
      const name = await getENS(provider, sender) ?? sender;
      addMessage!(`${name} donated ${amount}! "${message}""`, MessageType.donation);
      setProject((p) => ({ ...p, balance: p.balance + amount }));
    };
    contract().on(contract().filters.Donation(projectId), (id, sender, amount, message) => {
      effect(id, sender, amount, message);
    });
    return () => {
      contract().removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    async function effect() {
      if (title) {
        const getId = await getProjectId(title);
        if (getId.error) return addMessage!(getId.error);
        const id = getId.result!;
        setProjectId(id);

        const getProj = await getProject(id);

        if (getProj.error) return addMessage!(getProj.error);
        const proj = getProj.result!;
        setProject(proj);

        if (proj.uri) {
          const getStyle = await getProjectStyle(proj.uri);
          if (getStyle.error) return addMessage!(getStyle.error);

          setDonation(getStyle.result!.donationDefault!);
          setStyle(getStyle.result!);
        }
      }
    }
    setLoading!("Loading content");
    effect().then(()=>setLoading!(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    async function effect() {
      if (project.coin && user?.address) {
        const getBalance = await getCoinBalance(project.coin, user.address);
        getBalance.result ? setUserBalance(getBalance.result) : addMessage!(getBalance.error!);
      }
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, user]);

  const makeDonation = async () => {
    if (donation > userBalance) return addMessage("balance lower than donation");
    setLoading!("Making donation! This will take two transactions. Continue to your wallet!");
    const don = await donate(projectId, donation, message, project.coin);
    if (don.error) addMessage!(don.error);
    else addMessage!("Donation successful", MessageType.success);
    setLoading!("");
  };
  const progress = (project.balance / project.goal) * 100;
  if (projectId) {
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
        </div>
        {user ? (
          <div>
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
                <span onClick={() => setDonation(userBalance ?? 0)}>{userBalance}</span>
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
        ) : (
          <p>Login to donate</p>
        )}
      </div>
    );
  } else return <p>No project</p>;
}

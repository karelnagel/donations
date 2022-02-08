import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { contract, donate, getCoinBalance, getProject, getProjectId } from "../../functions/contract";
import { ethers } from "ethers";
import { getProjectStyle } from "../../functions/ipfs";
import { MessageType, NetworkInfo, Project, ProjectStyle } from "../../consts/interfaces";
import {} from "../../consts/setup";

export function Donate({
  provider,
  addMessage,
  networkInfo,
}: {
  provider: Web3Provider;
  networkInfo: NetworkInfo;
  addMessage: (message: string, type?: MessageType, time?: number | undefined) => void;
}) {
  let title = useParams().title;

  const [projectId, setProjectId] = useState(0);
  const [project, setProject] = useState<Project>({ balance: 0, goal: 0, active: true, owner: "", coin: "", uri: "" });
  const [style, setStyle] = useState<ProjectStyle>({});
  const [user, setUser] = useState<{ address: string; balance: number }>();
  const [donation, setDonation] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contract(provider).on(contract(provider).filters.Donation(projectId), (id, sender, amount, message) => {
      amount = Number(ethers.utils.formatEther(amount));
      addMessage(`${sender} donated ${amount}! "${message}""`, MessageType.donation);
      setProject((p) => ({ ...p, balance: p.balance + amount }));
    });
    return () => {
      contract(provider).removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, provider]);

  useEffect(() => {
    async function effect() {
      if (provider && title) {
        const getId = await getProjectId(provider, title);
        getId.result ? setProjectId(getId.result) : addMessage(getId.error!);

        const getProj = await getProject(provider, projectId);
        getProj.result ? setProject(getProj.result) : addMessage(getProj.error!);

        if (project.uri) {
          const getStyle = await getProjectStyle(project.uri);
          if (getStyle.result) {
            setDonation(getStyle.result.donationDefault!);
            setStyle(getStyle.result);
          } else addMessage(getStyle.error!);
        }
        const address = await provider.getSigner().getAddress();
        if (project.coin && address) {
          const getBalance = await getCoinBalance(provider, project.coin, address);
          getBalance.result ? setUser({ address, balance: getBalance.result }) : addMessage(getBalance.error!);
        }
        setLoading(false);
      }
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.coin, project.uri, projectId, provider, title]);

  const makeDonation = async () => {
    const don = await donate(provider, projectId, donation, message, project.coin);
    if (don.error) addMessage(don.error);
  };

  if (projectId && !loading) {
    return (
      <div className={styles.content}>
        {!project.active && <p>This project ended</p>}
        <div className={styles.imageBorder}>
          <img className={styles.image} src={style!.image} alt="a" />
        </div>
        <p className={styles.text1}>{style.name}</p>
        <p className={styles.text2}>{style.description}</p>
        <p className={styles.text2}>Owner: {project.owner}</p>
        <p>
          Reached {project.balance} of {project.goal} {networkInfo.coins.find((c) => c.value === project.coin)?.label}
        </p>

        <input
          type="number"
          placeholder="Donation"
          value={donation}
          onChange={(e) => setDonation(Number(e.target.value))}
          disabled={!project.active}
        />
        <p>Max {user?.balance}</p>
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} disabled={!project.active} />
        <button onClick={makeDonation} disabled={!project.active}>
          Donate
        </button>
        {project.owner === user?.address && (
          <button disabled={!project.active}>
            <Link to={"/edit/" + title}>Edit</Link>
          </button>
        )}
      </div>
    );
  } else if (loading) return <p>Loading ...</p>;
  else return <p>No project</p>;
}

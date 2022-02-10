import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getENS, useFunctions } from "../../hooks/useFunctions";
import { ethers } from "ethers";
import {} from "../../networks";
import { Context } from "../../interfaces/context";
import { MessageType } from "../../interfaces/message";
import { Icon } from "./Icon";
import { ProgressBar } from "../../components/ProgressBar";
import { useProjects } from "../../hooks/useProjects";

export function Donate() {
  const title = useParams().title;

  const { provider, network, addMessage, load, user } = useContext(Context);
  const { contract, getCoinBalance, donate } = useFunctions();
  const { id, project, style,setProject, } = useProjects();
  const [userBalance, setUserBalance] = useState(0);
  const [donation, setDonation] = useState(0);
  const [message, setMessage] = useState("");

  const coin = project ? network.coins.find((c) => c.value === project.coin)?.label : "";

  useEffect(() => {
    const effect = async (id: string, sender: string, amount: number, message: string) => {
      amount = Number(ethers.utils.formatEther(amount));
      const name = (await getENS(provider, sender)) ?? sender;
      addMessage(`${name} donated ${amount}! "${message}""`, MessageType.donation);
      setProject((p) => ({ ...p, balance: p.balance + amount }));
    };
    contract().on(contract().filters.Donation(id), (id, sender, amount, message) => {
      effect(id, sender, amount, message);
    });
    return () => {
      contract().removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const makeDonation = () =>
    load(async () => {
      if (donation > userBalance) return addMessage("balance lower than donation");
      const don = await donate(id, donation, message, project.coin);
      if (don.error) addMessage(don.error);
      else addMessage("Donation successful", MessageType.success);
    }, "Making donation! This will take two transactions. Continue to your wallet!");

  if (!id) return <p>No project</p>;
  return (
    <div className={styles.content}>
      {!project.active && <p>This project ended</p>}
      <div className={styles.imageBorder}>
        <img className={styles.image} src={style.image} alt="a" />
      </div>
      <p className={styles.name}>{style.name}</p>
      <p className={styles.description}>{style.description}</p>
      {style.external_url && (
        <a href={style.external_url} className={styles.website}>
          {style.external_url.replace(/^https?:\/\//, "")}
        </a>
      )}
      <div className={styles.icons}>
        <Icon url={style.links.twitter!} icon="twitter" />
        <Icon url={style.links.instagram!} icon="instagram" />
        <Icon url={style.links.youtube!} icon="youtube" />
        <Icon url={style.links.opensea!} icon="opensea" />
      </div>
      <ProgressBar balance={project.balance} goal={project.goal} coin={coin!} />
      {!user && <p>Login to donate</p>}
      {user && (
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
              <span onClick={() => setDonation(userBalance)}>{userBalance}</span>
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
      )}
    </div>
  );
}

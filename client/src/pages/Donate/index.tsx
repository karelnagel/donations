import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { contract, donate, getCoinBalance, getProject, getProjectId } from "../../functions/contract";
import { ethers } from "ethers";
import { getJson } from "../../functions/ipfs";
import { Style } from "../../consts/Style";
import { coins } from "../../consts/coins";

export function Donate(props: { provider: Web3Provider }) {
  let title = useParams().title;
  const [projectId, setProjectId] = useState(0);
  const [balance, setBalance] = useState(0);
  const [goal, setGoal] = useState(0);
  const [owner, setOwner] = useState("");
  const [coin, setCoin] = useState("");
  const [donation, setDonation] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [user, setUser] = useState("");
  const [style, setStyle] = useState<Style>({});
  const [userBalance, setUserBalance] = useState(0);
  const [newDonation, setNewDonation] = useState<{ sender: string; amount: number; message: string } | undefined>();

  useEffect(() => {
    contract(props.provider).on("Donation", (id, sender, amount, message) => {
      if (id.toNumber() === projectId) {
        amount = Number(ethers.utils.formatEther(amount));
        setNewDonation({ sender, amount, message });
        setBalance(balance + amount);
      }
    });
    return () => {
      contract(props.provider).removeAllListeners();
    };
  }, [balance, projectId, props.provider]);

  useEffect(() => {
    async function effect() {
      if (props.provider && title) {
        setProjectId(await getProjectId(props.provider, title));

        const project = await getProject(props.provider, projectId);
        setGoal(project.goal);
        setBalance(project.balance);
        setOwner(project.owner);
        setCoin(project.coin);
        setActive(project.active);

        if (project.styling) {
          const json = (await getJson(project.styling)) as Style;
          setDonation(json.donationDefault!)
          setStyle(json);
        }

        setUser(await props.provider.getSigner().getAddress());
        setUserBalance(await getCoinBalance(props.provider, project.coin));

        setLoading(false);
      }
    }
    effect();
  }, [coin, projectId, props.provider, title]);

  const makeDonation = async () => {
    await donate(props.provider, projectId, donation, message, coin);
  };

  if (projectId && !loading) {
    return (
      <div className={styles.content}>
        {!active && <p>This project ended</p>}
        <div className={styles.imageBorder}>
          <img className={styles.image} src={style!.image} alt="a" />
        </div>
        <p className={styles.text1}>{style.title}</p>
        <p className={styles.text2}>{style.title2}</p>
        <p className={styles.text2}>Owner: {owner}</p>
        <p>
          Reached {balance} of {goal} {coins.find((c)=>c.value===coin)?.label}
        </p>

        <input type="number" placeholder="Donation" value={donation} onChange={(e) => setDonation(Number(e.target.value))} disabled={!active} />
        <p>Max {userBalance}</p>
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} disabled={!active} />
        <button onClick={makeDonation} disabled={!active}>
          Donate
        </button>
        {owner === user && (
          <button disabled={!active}>
            <Link to={"/edit/" + title}>Edit</Link>
          </button>
        )}
        {newDonation && (
          <p>
            User {newDonation.sender} just donated {newDonation.amount} with message "{newDonation.message}"
          </p>
        )}
      </div>
    );
  } else if (loading) return <p>Loading ...</p>;
  else return <p>No project</p>;
}

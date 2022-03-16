import { Context } from "../interfaces/context";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFunctions } from "./useFunctions";
import { useNavigate, useParams } from "react-router-dom";
import {
  defaultProject,
  defaultProjectStyle,
  Project,
  ProjectStyle,
} from "../interfaces/project";
import { getProjectStyle, pinFileToIPFS, pinJSONToIPFS } from "./ipfs";
import { ethers } from "ethers";
import { MessageType } from "../interfaces/message";
import { Return } from "../interfaces/return";
import { Donation } from "../interfaces/donation";

export function useProjects() {
  const title = useParams().title;

  const { addMessage, load, network,user } = useContext(Context);
  const {
    getProject,
    getProjectAddress,
    token,
    donate,
    editProject,
    startProject,
    endProject,
    getENS,
    getAvatar,
  } = useFunctions();

  const [address, setAddress] = useState("");
  const [project, setProject] = useState<Project>(defaultProject);
  const [style, setStyle] = useState<ProjectStyle>(defaultProjectStyle);
  const [lastDonation, setLastDonation] = useState<Donation>();

  const navigate = useNavigate();
  const routeToEditPage = useCallback(
    (page) => navigate(page, { replace: true }),
    [navigate]
  );

  useEffect(() => {
    if (title && address) {
      const effect = async (
        sender: string,
        amount: number,
        message: string
      ) => {
        amount = Number(ethers.utils.formatEther(amount));
        const name = await getENS(sender);
        const avatar = await getAvatar(sender);
        setLastDonation({ name, amount, message, avatar, coin: coin });
        
        setProject((p) => ({ ...p, balance: p.balance + amount }));
      };
      const filter = token(address).filters.NewDonation();
      token(address).on(filter, (sender: string, amount: number, message: string) => {
        effect(sender, amount, message);
      });
      return () => {
        token(address).off(filter, (sender, amount, message) => {
          effect(sender, amount, message);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    async function effect() {
      if (title) {
        const getAddress = await getProjectAddress(title);
        if (getAddress.error) return addMessage(getAddress.error);
        const projectAddress = getAddress.result!;
        setAddress(projectAddress);

        const getProj = await getProject(projectAddress);

        if (getProj.error) return addMessage(getProj.error);
        const proj = getProj.result!;
        setProject({ ...proj, ownerName: await getENS(proj.owner) });

        const getStyle = await getProjectStyle(proj.uri);
        if (getStyle.error) return addMessage(getStyle.error);

        setStyle(getStyle.result!);
      }
    }
    load(effect, "Loading content");
    return () => {
      setAddress('');
      setProject(defaultProject);
      setStyle(defaultProjectStyle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  const openseaUrl = () => `${network.opensea}assets/${address}/1`;//Todo change 
  const makeDonation = (donation: number, message: string) =>
    load(async () => {
      const don = await donate(address, donation, message, project.coin);
      if (don.error) addMessage(don.error);
      // else addMessage("Donation successful", MessageType.success);
    }, "Making donation! This will take two transactions. Continue to your wallet!");

  const save = () =>
    load(async () => {
      const styleUrl = await pinJSONToIPFS({...style,fee_recipient:user?.address!});
      if (styleUrl.error) return addMessage(styleUrl.error);

      if (address) {
        const editProj = await editProject(address, project.goal, styleUrl.result!,style.image);
        if (editProj.error) return addMessage(editProj.error!);
        addMessage("Project successfully uploaded!", MessageType.success);
      } else {
        const startProj = await startProject(
          project.title,
          project.coin,
          project.goal,
          styleUrl.result!,
          style.image
        );
        if (startProj.error) return addMessage(startProj.error!);

        else {
          routeToEditPage(`/${project.title}/edit`);
          addMessage("Project successfully uploaded!", MessageType.success);
        }
      }
    }, "Uploading your project!");

  const end = () =>
    load(async () => {
      if (address) {
        const e = await endProject(address);
        if (e.error) addMessage(e.error);
        else {
          setProject((p) => ({ ...p, acive: false }));
          addMessage("Project ended successfully!", MessageType.success);
        }
      }
    }, "Ending project");

  const setTitle = async (e: any): Promise<Return> => {
    setProject((p) => ({ ...p, title: e.target.value }));
    const projectId = await getProjectAddress(e.target.value);
    console.log(projectId.result)
    if (projectId.result!=="0x0000000000000000000000000000000000000000" )
      return { error: "Title already taken" };
    else if (!e.target.value) return { error: "Title is required!" };
    return {};
  };

  const imageUpload = async (e: any) => {
    const img = e.target.files![0];
    if (img) {
      const imageUrl = await pinFileToIPFS(img);
      if (imageUrl.error) return addMessage(imageUrl.error);
      setStyle((s) => ({ ...s, image: imageUrl.result! }));
      console.log(imageUrl.result);
    }
  };

  const coin = project
    ? network.coins.find((c) => c.value === project.coin)?.label
    : "";
  return {
    coin,
    lastDonation,
    address,
    setAddress,
    project,
    setProject,
    style,
    setStyle,
    makeDonation,
    save,
    end,
    setTitle,
    imageUpload,
    openseaUrl,
  };
}

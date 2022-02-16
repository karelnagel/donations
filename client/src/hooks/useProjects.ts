import { Context } from "../interfaces/context";
import { useCallback, useContext, useEffect, useState } from "react";
import { getENS, useFunctions } from "./useFunctions";
import { useNavigate, useParams } from "react-router-dom";
import {
  defaultProject,
  defaultProjectStyle,
  Project,
  ProjectStyle,
} from "../interfaces/project";
import { getProjectStyle, useIPFS } from "./useIPFS";
import { ethers } from "ethers";
import { MessageType } from "../interfaces/message";
import { Return } from "../interfaces/return";

export function useProjects() {
  const title = useParams().title;

  const { addMessage, load, provider, network } = useContext(Context);
  const {
    getProjectId,
    getProject,
    contract,
    donate,
    editProject,
    startProject,
    endProject,
  } = useFunctions();
  const { uploadObject } = useIPFS();

  const [id, setId] = useState(0);
  const [project, setProject] = useState<Project>(defaultProject);
  const [style, setStyle] = useState<ProjectStyle>(defaultProjectStyle);
  const [lastDonation, setLastDonation] =
    useState<{ name: string; amount: number; message: string }>();

  const navigate = useNavigate();
  const routeToEditPage = useCallback(
    (page) => navigate(page, { replace: true }),
    [navigate]
  );

  useEffect(() => {
    if (title) {
      const effect = async (
        id: string,
        sender: string,
        amount: number,
        message: string
      ) => {
        amount = Number(ethers.utils.formatEther(amount));
        const name = (await getENS(provider, sender)) ?? sender;
        setLastDonation({ name, amount, message });
        addMessage(
          `${name} donated ${amount}! "${message}"`,
          MessageType.donation
        );
        setProject((p) => ({ ...p, balance: p.balance + amount }));
      };
      const filter = contract().filters.Donation(id);
      contract().on(filter, (id, sender, amount, message) => {
        effect(id, sender, amount, message);
      });
      return () => {
        contract().off(filter, (id, sender, amount, message) => {
          effect(id, sender, amount, message);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    async function effect() {
      if (title) {
        const getId = await getProjectId(title);
        if (getId.error) return addMessage(getId.error);
        const projectId = getId.result!;
        setId(projectId);

        const getProj = await getProject(projectId);

        if (getProj.error) return addMessage(getProj.error);
        const proj = getProj.result!;
        setProject(proj);

        const getStyle = await getProjectStyle(proj.uri);
        if (getStyle.error) return addMessage(getStyle.error);

        setStyle(getStyle.result!);
      }
    }
    load(effect, "Loading content");
    return () => {
      setId(0);
      setProject(defaultProject);
      setStyle(defaultProjectStyle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  const openseaUrl = () => `${network.opensea}assets/${network.token}/${id}`;
  const makeDonation = (donation: number, message: string) =>
    load(async () => {
      const don = await donate(id, donation, message, project.coin);
      if (don.error) addMessage(don.error);
      else addMessage("Donation successful", MessageType.success);
    }, "Making donation! This will take two transactions. Continue to your wallet!");

  const save = () =>
    load(async () => {
      const styleUrl = await uploadObject(style, true);
      if (styleUrl.error) return addMessage(styleUrl.error);

      if (id) {
        const editProj = await editProject(id, project.goal, styleUrl.result!);
        if (editProj.error) return addMessage(editProj.error!);
        addMessage("Project successfully uploaded!", MessageType.success);
      } else {
        const startProj = await startProject(
          project.coin,
          project.title,
          project.goal,
          styleUrl.result!
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
      if (id) {
        const e = await endProject(id);
        if (e.error) addMessage(e.error);
        else {
          setProject((p) => ({ ...p, acive: false }));
          addMessage("Project ended successfully!", MessageType.success);
        }
      }
    }, "Ending project");

  const setTitle = async (e: any): Promise<Return> => {
    setProject((p) => ({ ...p, title: e.target.value }));
    const projectId = await getProjectId(e.target.value);
    if (projectId.result && projectId.result > 0)
      return { error: "Title already taken" };
    else if (!e.target.value) return { error: "Title is required!" };
    return {};
  };

  const imageUpload = async (e: any) => {
    const img = e.target.files![0];
    if (img) {
      const imageUrl = await uploadObject(img);
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
    id,
    setId,
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

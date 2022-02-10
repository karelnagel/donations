import { Context } from "../interfaces/context";
import { useContext, useEffect, useState } from "react";
import { getENS, useFunctions } from "./useFunctions";
import { useParams } from "react-router-dom";
import {
  defaultProject,
  defaultProjectStyle,
  Project,
  ProjectStyle,
} from "../interfaces/project";
import { getProjectStyle } from "./useIPFS";
import { ethers } from "ethers";
import { MessageType } from "../interfaces/message";

export function useProjects() {
  const title = useParams().title;

  const { addMessage, load, provider } = useContext(Context);
  const { getProjectId, getProject, contract } = useFunctions();

  const [id, setId] = useState(0);
  const [project, setProject] = useState<Project>(defaultProject);
  const [style, setStyle] = useState<ProjectStyle>(defaultProjectStyle);

  useEffect(() => {
    const effect = async (
      id: string,
      sender: string,
      amount: number,
      message: string
    ) => {
      amount = Number(ethers.utils.formatEther(amount));
      const name = (await getENS(provider, sender)) ?? sender;
      addMessage(
        `${name} donated ${amount}! "${message}""`,
        MessageType.donation
      );
      setProject((p) => ({ ...p, balance: p.balance + amount }));
    };
    contract().on(
      contract().filters.Donation(id),
      (id, sender, amount, message) => {
        effect(id, sender, amount, message);
      }
    );
    return () => {
      contract().removeAllListeners();
    };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  return { id, setId, project, setProject, style, setStyle };
}

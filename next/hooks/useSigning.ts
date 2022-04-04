import { useContext } from "react";
import { Context } from "../idk/context";
import { domain } from "../idk/config";
import { ProjectInfo, ProjectInfoTypes } from "../interfaces/ProjectInfo";
import { uploadImage } from "../lib/storage";
import axios from "axios";

export default function useSigning() {
  const { provider } = useContext(Context)

  async function sign(types: any, value: any) {
    const signature = await provider?.getSigner()._signTypedData(domain, types, value);
    if (!signature) return
    return signature
  }

  const uploadData = async (title: string, id: string, projectInfo: ProjectInfo, file?: File) => {
    if (file) {
      const imageResult = uploadImage(`images/${title}/${id}`, file); // Todo move to api
      if (!imageResult) return false
    }
    const signature = await sign(ProjectInfoTypes, projectInfo);
    if (!signature) return false

    const result = await axios.post(`/api/projects/${title}/${id}/`, { signature, projectInfo });
    if (result.status !== 200) return false
    return true;
  }
  return { sign, uploadData }
}
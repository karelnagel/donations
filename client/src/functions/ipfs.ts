import * as IPFS from "ipfs-core";
import { ProjectObj } from "../consts/interfaces";

const gateway = "https://ipfs.io/ipfs/";
let ipfs: any;
export const upload = async (
  style: ProjectObj,
  image?: any
): Promise<string> => {
  if (!ipfs) ipfs = await IPFS.create();
  if (image) {
    const imageUri = await uploadObject(image);
    style.image = imageUri;
  }
  const uri = await uploadObject(JSON.stringify(style, null, 2));
  return uri;
};

export const getProjectObj = async (uri: string) => {
  const result = await fetch(uri);
  return await result.json();
};

export const uploadObject = async (object: any) => {
  let url = (await ipfs.add(object)).cid.toString();
  return gateway + url;
};

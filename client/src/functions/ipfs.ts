import * as IPFS from "ipfs-core";
import {
  error,
  ProjectStyle,
  ReturnProjectStyle,
  ReturnString,
} from "../consts/interfaces";

const gateway = "https://ipfs.io/ipfs/";
let ipfs: any;
export const upload = async (
  style: ProjectStyle,
  image?: any
): Promise<ReturnString> => {
  try {
    if (!ipfs) ipfs = await IPFS.create();
    if (image) {
      const imageUri = await uploadObject(image);
      style.image = imageUri;
    }
    const uri = await uploadObject(JSON.stringify(style, null, 2));
    return { result: uri };
  } catch (e) {
    return error("Upload failed", e);
  }
};

export const getProjectStyle = async (
  uri: string
): Promise<ReturnProjectStyle> => {
  try {
    const result = await fetch(uri);
    return { result: await result.json() };
  } catch (e) {
    return error("Can't get project style", e);
  }
};

export const uploadObject = async (object: any) => {
  let url = (await ipfs.add(object)).cid.toString();
  return gateway + url;
};

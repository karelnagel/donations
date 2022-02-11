import { create } from "ipfs-core";
import { error, ReturnProjectStyle, ReturnString } from "../interfaces/return";

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

export function useIPFS() {
  const gateway = "https://ipfs.io/ipfs/";

  const uploadObject = async (
    object: any,
    json = false
  ): Promise<ReturnString> => {
    try {
      const ipfs = await create({ repo: Math.random().toString() });
      if (json) object = JSON.stringify(object, null, 2);
      const url = (await ipfs.add(object)).cid.toString();
      return { result: gateway + url };
    } catch (e) {
      return error("Can't upload object", e);
    }
  };

  return { uploadObject };
}

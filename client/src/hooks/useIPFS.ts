import {create, IPFS} from "ipfs-core";
import { useEffect, useState } from "react";
import { error, ReturnProjectStyle, ReturnString } from "../interfaces/return";

export const getProjectStyle = async (uri: string): Promise<ReturnProjectStyle> => {
  try {
    const result = await fetch(uri);
    return { result: await result.json() };
  } catch (e) {
    return error("Can't get project style", e);
  }
};

export function useIPFS() {
  const gateway = "https://ipfs.io/ipfs/";
  const [ipfs, setIpfs] = useState<IPFS>();

  useEffect(() => {
    const effect=async ()=>{
      try{
      setIpfs(await create())// Todo fix the lock somehow
      }
      catch{
        console.log("ipfs fucked")
      }
    }
    effect()
  }, []);

  

  const uploadObject = async (
    object: any,
    json = false
  ): Promise<ReturnString> => {
    try {
      if(!ipfs) return {error:"No ipfs"}
      object = JSON.stringify(object, null, 2);
      const url = (await ipfs.add(object)).cid.toString();
      return { result: gateway + url };
    } catch (e) {
      return error("Can't upload object", e);
    }
  };

  return { uploadObject };
}
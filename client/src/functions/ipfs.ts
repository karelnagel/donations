import * as IPFS from "ipfs-core";

const gateway = "https://ipfs.io/ipfs/";

export const uploadJson = async (array: string[]): Promise<string[]> => {
  const ipfs = await IPFS.create();
  const returnValue = [];
  for (let i = 0; i < array.length; i++) {
    const uri = (await ipfs.add(array[i])).cid.toString();
    returnValue.push(gateway + uri);
  }
  return returnValue;
};

export const getJson = async (uri: string) => {
  const result = await fetch(uri);
  return await result.json();
};

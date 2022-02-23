import { error, ReturnProjectStyle, ReturnString } from "../interfaces/return";
const gateway = "https://cloudflare-ipfs.com/ipfs/";
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

export const pinJSONToIPFS = async (object: any): Promise<ReturnString> => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
      pinata_api_key: process.env.REACT_APP_PINATA_PUBLIC!,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET!,
    },
    body: JSON.stringify(object, null, 2),
  };
  try {
    const result = await fetch(url, requestOptions);
    const ipfsUrl = gateway + (await result.json()).IpfsHash;
    console.log(ipfsUrl);
    return { result: ipfsUrl };
  } catch (e) {
    return error("Can't upload object", e);
  }
};

export const pinFileToIPFS = async (object: any): Promise<ReturnString> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const data = new FormData();
  data.append("file", object);

  const requestOptions = {
    method: "POST",
    headers: {
      pinata_api_key: process.env.REACT_APP_PINATA_PUBLIC!,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET!,
    },
    body: data,
  };

  try {
    const result = await fetch(url, requestOptions);
    const ipfsUrl = gateway + (await result.json()).IpfsHash;
    console.log(ipfsUrl);
    return { result: ipfsUrl };
  } catch (e) {
    return error("Can't upload object", e);
  }
};

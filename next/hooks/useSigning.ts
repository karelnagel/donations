import { useContext } from "react";
import { Context } from "../idk/context";
import { domain } from "../idk/settings";

export default function useSigning() {
  const { provider } = useContext(Context)

  async function sign(types: any, value: any) {
    const signature = await provider?.getSigner()._signTypedData(domain, types, value);
    if (!signature) return
    return signature
  }
  return {sign}
}
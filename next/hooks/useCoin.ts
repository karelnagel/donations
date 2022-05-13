import { coinName, toCoin, toWei } from "../idk/helpers";

export default function useCoin({ coin }: { coin?: string }) {

  const getCoin = (wei: string) => {
    return toCoin(wei, coin)
  };

  const getWei = (ether: string) => {
    return toWei(ether, coin)
  };

  const getName = () => {
    return coinName(coin)
  }
  return { getCoin, getWei, getName }
}

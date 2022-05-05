import { useRouter } from "next/router";
import { NewDonation } from "../../components/NewDonation";
import useCollection from "../../hooks/useCollection";
import Image from "next/image";
import { coinName, getImage, toCoin, toWeiStr } from "../../idk/helpers";
import { Donation } from "../../graphql/generated";

export default function Stream() {
  const { title, left } = useRouter().query;

  const { collection, lastDonation } = useCollection(title?.toString()!, null);
  const donationPercent =
    collection?.donated && collection?.goal
      ? (Number(toCoin(collection.donated, collection.coin.id)) / Number(toCoin(collection.goal, collection.coin.id))) * 100
      : 0;

  if (!collection) return <div></div>;
  return (
    <div className={`relative h-[100vh] ml-auto text-white flex flex-col justify-between ${left ? "items-start" : "items-end"}`}>
      <div className={`${left ? "rounded-br-2xl" : "rounded-bl-2xl"} overflow-hidden`}>
        <NewDonation
          donation={
            lastDonation ??
            ({
              amount: toWeiStr("100", collection.coin.id),
              message: "hello",
              donator: { id: "0xF4ABa5431B0A26E15FC50Ca03264011e8d86EaB9" },
              collection,
            } as Donation)
          }
        />
      </div>
      <div className={`bg-stream1 h-16 flex overflow-hidden shadow-lg ${left ? "rounded-tr-2xl" : "rounded-tl-2xl"}`}>
        <div className="relative h-16 w-16 object-cover">
          <Image src={getImage(collection.image)} alt="" layout="fill" />
        </div>
        <div className="relative flex items-center uppercase font-bold text-lg space-x-20 pr-2">
          <div className="absolute left-0 w-[90%] h-full bg-stream2 shadow-md" style={{ width: `${donationPercent ?? "0"}%` }}></div>
          <p className="relative">{collection.name}</p>
          <p className="relative">
            {toCoin(collection.donated, collection.coin.id).split(".")[0]} / {toCoin(collection.goal, collection.coin.id).split(".")[0]}{" "}
            {coinName(collection.coin.id)}
          </p>
        </div>
      </div>
    </div>
  );
}

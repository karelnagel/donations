import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import { Donation } from "../graphql/generated";
import { coinName, short, toCoin } from "../idk/helpers";

export function NewDonation({ donation }: { donation?: Donation }) {
  const [visible, setVisible] = useState(false);
  const {data:name} = useEnsName({ address: donation?.donator.id });
  const {data:avatar} = useEnsAvatar({ addressOrName: donation?.donator.id });

  useEffect(() => {
    const effect = async () => {
      if (donation) {
        setVisible(true);
        setTimeout(() => setVisible(false), 20000);
      }
    };
    effect();
  }, [donation]);

  return donation && visible ? (
    <div
      onClick={() => setVisible(false)}
      className="cursor-pointer bg-stream1 shadow-md flex items-center overflow-hidden space-x-10 uppercase font-bold text-lg pr-2 text-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {avatar && <img alt="" src={avatar} className="w-16 h-16" />}

      <p className="my-4 ml-4">{name ?? short(donation.donator.id)}</p>
      <p>
        {toCoin(donation.amount, donation.collection.coin.id)} {coinName(donation.collection.coin.id)}
      </p>
      <p>{`'${donation.message}'`}</p>
    </div>
  ) : (
    <div></div>
  );
}

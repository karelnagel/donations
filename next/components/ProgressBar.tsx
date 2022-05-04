import { Collection } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";

export function ProgresssBar({ collection }: { collection?: Collection }) {
  const donationPercent =
    collection?.donated && collection?.goal
      ? (Number(toCoin(collection.donated, collection.coin)) / Number(toCoin(collection.goal, collection.coin))) * 100
      : 0;

  return collection ? (
    <div className="relative">
      <p className="font-bold mb-1 text-center">
        Collected {toCoin(collection.donated, collection.coin)} / {toCoin(collection.goal, collection.coin)} {coinName(collection.coin)} with{" "}
        {collection.donationsCount} donations
      </p>
      <div className="max-w-sm border-primary border-2 h-8 mx-2 md:mx-auto rounded-lg overflow-hidden shadow-lg bg-background">
        <div className={`bg-primary h-full`} style={{ width: `${donationPercent ?? "0"}%` }}></div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

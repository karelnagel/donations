import { useEffect, useState } from "react";
import { Token } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";
import { AccountObject } from "./AccountObject";

export function NewDonation({ donation, onlyNew = true }: { donation?: Token; onlyNew?: boolean }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (onlyNew) {
      if (donation) {
        setVisible(true);
        setTimeout(() => setVisible(false), 15000);
      } else setVisible(true);
    }
  }, [donation, onlyNew]);

  return donation && visible ? (
    <div
      onClick={() => setVisible(false)}
      className="cursor-pointer bg-blue-300 rounded-lg px-4 py-2 shadow-lg flex flex-col items-center max-w-screen-sm"
    >
      <div className="flex items-center space-x-1">
        <AccountObject account={donation.owner.id} />
        <p>
          donated {toCoin(donation.amount)} {coinName(donation.project.coin)}
        </p>
      </div>
      <p>{`"${donation.message}"`}</p>
    </div>
  ) : (
    <div></div>
  );
}

import { useProjects } from "../../hooks/useProjects";

export function LastDonation() {
  const { lastDonation, coin } = useProjects();
  return (
    <div>
      <h2>Donations</h2>
      {lastDonation && (
        <div>
          <h2>{`${lastDonation.name} donated ${lastDonation.amount} ${coin}`}</h2>
          <h2>{lastDonation.message}</h2>
        </div>
      )}
    </div>
  );
}

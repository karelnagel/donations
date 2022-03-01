import { DonationMessage } from "../../components/DonationMessage";
import { useProjects } from "../../hooks/useProjects";

export function LastDonation() {
  const { lastDonation } = useProjects();

  return (
    <div>
       <DonationMessage donation={lastDonation ?? { name: "Peter Pan", amount: 1000, avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", message: "Hello!" }} />
    </div>
  );
}

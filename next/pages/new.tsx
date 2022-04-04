import EditPage, { Type } from "../components/EditPage";

export default function New() {
  return <EditPage topText="Create new contract" buttonText="Create contract" type={Type.NEW_CONTRACT} />;
}

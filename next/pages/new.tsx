import EditPage, { Type } from "../components/EditPage";

export default function New() {
  return <EditPage topText="Create new collection" buttonText="Create collection" type={Type.NEW_COLLECTION} />;
}

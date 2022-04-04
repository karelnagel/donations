import EditPage, { Type } from "../components/EditPage";
import Layout from "../components/Layout";

export default function New() {
  return (
    <Layout>
      <div>
        <h2>Create new contract</h2>
        <EditPage  type={Type.NEW_CONTRACT} />
      </div>
    </Layout>
  );
}

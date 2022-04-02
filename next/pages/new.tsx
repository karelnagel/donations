import Layout from "../components/Layout";

export default function New() {
  return (
    <Layout>
      <div>
        <h2>Create new contract</h2>
        <form action="">
          <input type="text" placeholder="title" />
          <input type="text" placeholder="coin" />
          <input type="text" placeholder="projectOwner" />
          <button type="submit">New contract</button>
        </form>
      </div>
    </Layout>
  );
}

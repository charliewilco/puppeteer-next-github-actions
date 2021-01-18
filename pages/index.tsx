import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "../components/Layout";
import Person, { ConvertedPerson, IPerson } from "../db/models";
import dbConnect from "../db/connect";
import ListItem from "../components/List-Item";

export const getServerSideProps: GetServerSideProps<{
  people: ConvertedPerson[];
}> = async () => {
  await dbConnect();

  const result: IPerson[] = await Person.find({});
  const people = result.map((doc) => {
    const p = doc.toObject();
    p._id = p._id.toString();
    return p;
  });

  return { props: { people } };
};

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ people }) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <header className="py-4">
      <h1 className="text-2xl font-bold">Contacts 👋</h1>
    </header>

    <div data-testid="LIST_HOME" className="py-2 space-y-4">
      {people.map((p) => (
        <ListItem
          key={p._id}
          id={p._id}
          name={p.name}
          city={p.city}
          age={p.age}
        />
      ))}
    </div>
  </Layout>
);

export default IndexPage;

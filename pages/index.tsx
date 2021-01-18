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
    <div className="hero bg-gray">
      <div className="hero-body">
        <h1>Hello Next.js 👋</h1>
      </div>
    </div>

    <div data-testid="LIST_HOME" className="py-2">
      {people.map((p) => (
        <ListItem key={p._id} id={p._id} name={p.name} city={p.city} age={p.age} />
        
      ))}
    </div>
  </Layout>
);

export default IndexPage;

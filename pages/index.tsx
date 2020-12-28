import Link from "next/link";
import Layout from "../components/Layout";
import Person, { ConvertedPerson } from "../db/models";
import dbConnect from "../db/connect";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  people: ConvertedPerson[];
}> = async () => {
  await dbConnect();

  const result = await Person.find({});
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
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a data-testid="ABOUT_LINK">About</a>
      </Link>
    </p>
    <div data-testid="LIST_HOME">
      {people.map((p) => (
        <div key={p._id}>
          <div className="card" data-testid="PERSON_CARD">
            <h5>{p.name}</h5>
            <div className="main-content">
              <p>
                {p.age} | {p.city}
              </p>

              <div className="btn-container">
                <Link href="/[id]/edit" as={`/${p._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/[id]" as={`/${p._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Layout>
);

export default IndexPage;

import { useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../db/connect";
import Person, { ConvertedPerson } from "../../db/models";
import Layout from "../../components/Layout";

export const getServerSideProps: GetServerSideProps<
  { person?: ConvertedPerson },
  { id: string }
> = async ({ params }) => {
  await dbConnect();

  if (params?.id) {
    const person = await Person.findById(params.id).lean();
    person._id = person._id.toString();

    return { props: { person } };
  }

  return { props: { person: undefined } };
};

const DetailsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ person }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const id = router.query.id;

    try {
      await fetch(`/api/people/${id}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the person.");
    }
  };

  if (!person) {
    return <h1>Not found</h1>;
  }

  const title = person.name + "| Edit";

  return (
    <Layout title={title}>
      <div>
        <div className="card">
          <div className="card-header">
            <div className="card-title h5">{person.name}</div>
            <div className="card-subtitle text-gray">Age: {person.age}</div>
            <div className="card-subtitle text-gray">City: {person.city}</div>
          </div>

          <div className="card-footer">
            <Link href="/[id]/edit" as={`/${person._id}/edit`}>
              <button className="btn  btn-primary">Edit</button>
            </Link>{" "}
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>

        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
};

export default DetailsPage;

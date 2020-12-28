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

  return (
    <div key={person._id}>
      <div className="card">
        <h5 className="person-name">{person.name}</h5>
        <div className="main-content">
          <p className="person-name">{person.name}</p>
          <p className="owner">Age: {person.age}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${person._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DetailsPage;

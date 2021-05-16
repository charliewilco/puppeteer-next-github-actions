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
import Avatar from "../../components/Avatar";

export const getServerSideProps: GetServerSideProps<
  { person?: ConvertedPerson | null },
  { id: string }
> = async ({ params }) => {
  await dbConnect();

  if (params?.id) {
    const person = await Person.findById(params.id).lean();
    if (person !== null) {
      person._id = person._id.toString();
    }

    return { props: { person } };
  }

  return { props: { person: null } };
};

const DetailsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ person }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const id = router.query.id;

    try {
      await fetch(`/api/peop_e/${id}`, {
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

  const title = person.name + " | Edit";

  return (
    <Layout title={title}>
      <div className="bg-white shadow-sm rounded p-4">
        <div className="card">
          <div className="mb-4">
            <Avatar>{person.name[0]}</Avatar>
          </div>
          <h1 className="text-2xl mb-4">{person.name}</h1>

          <div className="card-header grid gap-6 grid-cols-3">
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-2">
                Age
              </p>
              <p className="font-mono text-xl">{person.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-2">
                City
              </p>
              <p className="font-mono text-xl">{person.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-2">
                Phone #
              </p>
              <p className="font-mono text-xl">N/A</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end">
            <Link href="/[id]/edit" as={`/${person._id}/edit`}>
              <button className="text-blue-500 text-sm mr-4 font-bold">
                Edit
              </button>
            </Link>
            <button
              className="text-red-400 text-sm mr-4 font-bold"
              onClick={handleDelete}
            >
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

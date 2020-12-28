import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditPerson = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/people/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading...</p>;

  const initialValues = {
    ...data,
  };

  return (
    <Form formId="edit-form" initialValues={initialValues} create={false} />
  );
};

export default EditPerson;

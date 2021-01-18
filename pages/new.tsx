import Form, { defaultValues } from "../components/Form";
import Layout from "../components/Layout";

const New = () => {
  return (
    <Layout title="New Person">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Add New Contact</h1>
      </header>

      <div data-testid="NEW_FORM">
        <Form formId="add-person-form" initialValues={defaultValues} />
      </div>
    </Layout>
  );
};

export default New;

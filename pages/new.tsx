import Form, { defaultValues } from "../components/Form";
import Layout from "../components/Layout";

const New = () => {
  return (
    <Layout title="New Person">
      <div data-testid="NEW_FORM">
        <Form formId="add-person-form" initialValues={defaultValues} />
      </div>
    </Layout>
  );
};

export default New;

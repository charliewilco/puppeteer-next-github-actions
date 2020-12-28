import Form, { defaultValues } from "../components/Form";

const New = () => {
  return (
    <div data-testid="NEW_FORM">
      <Form formId="add-person-form" initialValues={defaultValues} />
    </div>
  );
};

export default New;

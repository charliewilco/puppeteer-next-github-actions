import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface IPersonForm {
  name: string;
  city: string;
  age: number;
}

export const defaultValues: IPersonForm = {
  name: "",
  city: "",
  age: 24,
};

interface IFormProps {
  create?: boolean;
  initialValues: IPersonForm;
  formId: string;
}

const Form: React.FC<IFormProps> = ({
  formId,
  initialValues,
  create = true,
}) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState<Record<any, any>>({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<IPersonForm>({
    ...initialValues,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: IPersonForm) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/people/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/people/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update person");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: IPersonForm) => {
    try {
      const res = await fetch("/api/people", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add person");
    }
  };

  const handleChange = (e: ChangeEvent<any>) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      create ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure person info is filled for person name, owner name, species, and image url*/
  const formValidate = (): Record<any, any> => {
    let err: any = {};
    if (!form.name) err.name = "Name is required";
    if (!form.age) err.age = "Age is required";
    if (!form.city) err.species = "City is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            maxLength={20}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            maxLength={20}
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {message && <p data-testid="RESPONSE_MESSAGE">{message}</p>}

      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;

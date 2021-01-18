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
  city: "Seattle",
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
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                maxLength={20}
                name="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                maxLength={20}
                name="city"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="age"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={form.age}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
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

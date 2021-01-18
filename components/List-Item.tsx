import Link from "next/link";
import Avatar from "./Avatar";

interface IListProps {
  name: string;
  age: number | string;
  city: string;
  id: string;
}

const ListItem = ({ id, name, age, city }: IListProps) => {
  return (
    <div className="bg-white shadow-sm rounded p-4" data-testid="PERSON_CARD">
      <div className="grid sm:gap-6 grid-cols-12	">
        <div className="col-span-2 flex justify-center items-center">
          <Avatar>{name[0]}</Avatar>
        </div>
        <div className="col-span-10">
          <h5 className="text-lg font-semibold">{name}</h5>

          <p className="text-lg text-gray-400">{city}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-4 flex justify-end ">
        <Link href="/[id]/edit" as={`/${id}/edit`}>
          <button className="text-blue-500 text-sm mr-4 font-bold">Edit</button>
        </Link>
        <Link href="/[id]" as={`/${id}`}>
          <button className="text-blue-500  text-sm font-bold">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ListItem;

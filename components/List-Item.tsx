import Link from "next/link";

interface IListProps {
  name: string;
  age: number | string;
  city: string;
  id: string;
}

const ListItem = ({ id, name, age, city }: IListProps) => {
  return (
    <div>
      <div className="tile" data-testid="PERSON_CARD">
        <div className="tile-icon">
          <figure
            className="avatar avatar-xl"
            data-initial={name[0]}
            style={{
              backgroundColor: "#5755d9",
            }}
          ></figure>
        </div>
        <div className="tile-content">
          <h5 className="tile-title">{name}</h5>

          <p className="tile-subtitle">
            {age} | {city}
          </p>

          <div className="tile-action">
            <Link href="/[id]/edit" as={`/${id}/edit`}>
              <button className="btn btn-sm btn-primary">Edit</button>
            </Link>{" "}
            <Link href="/[id]" as={`/${id}`}>
              <button className="btn btn-sm">View</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

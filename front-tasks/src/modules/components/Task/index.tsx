type Props = {
  id: number;
  name: string;
  description: string;
  date: string;
};

export function Task({ id, name, description, date }: Readonly<Props>) {
  return (
    <div className="card mb-3" key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Due Date: {date}</p>
      </div>
    </div>
  );
}

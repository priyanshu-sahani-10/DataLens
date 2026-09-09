export default function Overview({ data }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        title="Rows"
        value={data.rows}
      />

      <Card
        title="Columns"
        value={data.columns}
      />

      <Card
        title="Missing Values"
        value={data.missing_values}
      />

      <Card
        title="Duplicate Rows"
        value={data.duplicate_rows}
      />
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}
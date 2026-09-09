export default function PreviewTable({
  data,
}) {
  if (!data?.length) return null;

  const columns = Object.keys(
    data[0]
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Preview
      </h2>

      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border p-3 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(
              (row, index) => (
                <tr key={index}>
                  {columns.map(
                    (col) => (
                      <td
                        key={col}
                        className="border p-3"
                      >
                        {
                          row[col]
                        }
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
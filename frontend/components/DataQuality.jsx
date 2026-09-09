export default function DataQuality({
  data,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Missing Values
      </h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-3">
                Column
              </th>
              <th className="border p-3">
                Missing
              </th>
              <th className="border p-3">
                Percent
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (item) => (
                <tr
                  key={
                    item.column
                  }
                >
                  <td className="border p-3">
                    {
                      item.column
                    }
                  </td>

                  <td className="border p-3">
                    {
                      item.missing
                    }
                  </td>

                  <td className="border p-3">
                    {
                      item.percent
                    }
                    %
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
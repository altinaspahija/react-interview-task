
interface TableProps<T> {
  data: T[];
  columns: { header: string; key: keyof T }[];
  onRowClick: (id: string) => void;
  textColor: string;
  textAlign?: string;
}

const Table = <T extends { id: string }>({
  data,
  columns,
  onRowClick,
  textColor,
  textAlign,
}: TableProps<T>) => {
  return (
    <table className="bg-white w-full justify-center">
      <thead className="bg-white text-[#323338] text-md font-semibold">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className={`py-2 px-4 ${textAlign}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id}
            className={`${index % 2 === 0 ? "bg-[#F8F8FA]" : "bg-white"} hover:cursor-pointer font-normal`}
            onClick={() => onRowClick?.(row.id as string)}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className={`py-2 px-4 ${textColor} ${textAlign} `}>
                {row[column.key] as any}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

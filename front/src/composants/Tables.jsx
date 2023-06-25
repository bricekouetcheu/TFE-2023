import React,{useState} from 'react';
import { useTable, useRowSelect, useTableState } from "react-table";

const Tables = ({data}) => {
    const [tableData, setTableData] = useState(data);
    
  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question"
      },
      {
        Header: "Response",
        accessor: "value",
        Cell: ({ row }) => (
          <input
            type="text"
            value={row.original.value}
            onChange={(e) => {
              const newData = [...tableData];
              newData[row.index].value = e.target.value;
              setTableData(newData);
            }}
          />
        )
      }
    ],
    [tableData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: tableData }, useRowSelect, useTableState);

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export default Tables;
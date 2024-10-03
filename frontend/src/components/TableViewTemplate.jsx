import React, { useState } from 'react';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`py-2 px-4 border-b border-gray-300 ${column.align === 'center' ? 'text-center' : 'text-left'}`}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                        <td key={index} className="py-2 px-4 border-b border-gray-300">
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm">Rows per page:</span>
                        <select
                            className="ml-2 border border-gray-300 rounded"
                            value={rowsPerPage}
                            onChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        >
                            {[5, 10, 25, 100].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span className="text-sm">Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}</span>
                        <button
                            className="ml-2 border border-gray-300 rounded p-1"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="ml-2 border border-gray-300 rounded p-1"
                            onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(rows.length / rowsPerPage) - 1))}
                            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableViewTemplate;

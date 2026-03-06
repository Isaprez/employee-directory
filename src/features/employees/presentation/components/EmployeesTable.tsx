import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  type RowData,
} from "@tanstack/react-table";
import type React from "react";
import type { Employee } from "../../domain/employee.types";

const statusStyles: Record<string, { badge: string; dot: string }> = {
  active: {
    badge: "bg-green-50 text-green-700",
    dot: "bg-green-500",
  },
  inactive: {
    badge: "bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
};

const defaultStatusStyle = { badge: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "Name",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("position", {
    header: "Position",
    meta: { hideOnMobile: true },
  }),
  columnHelper.accessor("department", {
    header: "Department",
    meta: { hideOnMobile: true },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const styles = statusStyles[status] ?? defaultStatusStyle;
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-2 w-2 rounded-full ${styles.dot}`}
          />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  }),
];

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    hideOnMobile?: boolean;
  }
}

interface EmployeesTableProps {
  data: Employee[];
  onRowClick?: (employee: Employee) => void;
}

export default function EmployeesTable({ data, onRowClick }: EmployeesTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 sm:px-6 ${
                    header.column.columnDef.meta?.hideOnMobile ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-sm text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-100 ${onRowClick ? "cursor-pointer" : ""}`}
              onClick={() => onRowClick?.(row.original)}
              {...(onRowClick
                ? {
                    tabIndex: 0,
                    role: "button",
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick(row.original);
                      }
                    },
                  }
                : {})}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-3 py-3 text-sm text-gray-600 sm:whitespace-nowrap sm:px-6 sm:py-4 ${
                    cell.column.columnDef.meta?.hideOnMobile ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { Department } from "../../domain/employee.types";

interface DepartmentFilterProps {
  departments: Department[];
  value: string;
  onChange: (department: string) => void;
}

export default function DepartmentFilter({
  departments,
  value,
  onChange,
}: DepartmentFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="department-filter"
        className="text-sm font-medium text-gray-700"
      >
        Department:
      </label>
      <select
        id="department-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">All</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}

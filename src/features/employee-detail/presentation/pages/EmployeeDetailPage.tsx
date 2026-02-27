import { useGetEmployeeDetailsQuery } from "../../data/employee-detailApi";
import EmployeeDetailTable from "../components/EmployeeDetailTable";
import type { EmployeeDetail } from "../../domain/employee-detail.types";

interface EmployeeDetailPageProps {
  onSelectEmployee?: (employee: EmployeeDetail) => void;
}

export default function EmployeeDetailPage({
  onSelectEmployee,
}: EmployeeDetailPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeeDetailsQuery();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>
      {employees && (
        <EmployeeDetailTable data={employees} onRowClick={onSelectEmployee} />
      )}
    </div>
  );
}

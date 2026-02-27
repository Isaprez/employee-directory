import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeDetailDetailPage from "../../../employee-detail/presentation/pages/EmployeeDetailDetailPage";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  if (selectedEmployeeId !== null) {
    return (
      <EmployeeDetailDetailPage
        employeeId={selectedEmployeeId}
        onBack={() => setSelectedEmployeeId(null)}
      />
    );
  }

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">Failed to load employees.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Employees</h1>
      {employees && (
        <EmployeesTable
          data={employees}
          onRowClick={(employee) => setSelectedEmployeeId(employee.id)}
        />
      )}
    </div>
  );
}

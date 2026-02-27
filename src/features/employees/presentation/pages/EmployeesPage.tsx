import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";
import EmployeeDetailDetailPage from "../../../employee-detail/presentation/pages/EmployeeDetailDetailPage";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (selectedEmployeeId !== null) {
    return (
      <EmployeeDetailDetailPage
        employeeId={selectedEmployeeId}
        onBack={() => setSelectedEmployeeId(null)}
      />
    );
  }

  if (showCreateForm) {
    return (
      <div className="p-8">
        <button
          onClick={() => setShowCreateForm(false)}
          className="mb-6 text-sm text-blue-600 hover:text-blue-800"
        >
          &larr; Back to Employees
        </button>
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          New Employee
        </h1>
        <EmployeeCreateForm onSuccess={() => setShowCreateForm(false)} />
      </div>
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Employee
        </button>
      </div>
      {employees && (
        <EmployeesTable
          data={employees}
          onRowClick={(employee) => setSelectedEmployeeId(employee.id)}
        />
      )}
    </div>
  );
}

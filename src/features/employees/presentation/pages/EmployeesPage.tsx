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
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showCreateForm ? "Cancel" : "Add Employee"}
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            New Employee
          </h2>
          <EmployeeCreateForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      )}
      {employees && (
        <EmployeesTable
          data={employees}
          onRowClick={(employee) => setSelectedEmployeeId(employee.id)}
        />
      )}
    </div>
  );
}

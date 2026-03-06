import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetEmployeesQuery,
  useGetDepartmentsQuery,
} from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";
import DepartmentFilter from "../components/DepartmentFilter";
import EmployeeDetailDetailPage from "../../../employee-detail/presentation/pages/EmployeeDetailDetailPage";

export default function EmployeesPage() {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return undefined;
    if (!selectedDepartment) return employees;
    return employees.filter((e) => e.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleCreateSuccess = useCallback(() => {
    setShowCreateForm(false);
    setSuccessMessage("Employee created successfully.");
  }, []);

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
      <div className="p-4 sm:p-8">
        <button
          onClick={() => setShowCreateForm(false)}
          className="mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-blue-600 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
        >
          &larr; Back to Employees
        </button>
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          New Employee
        </h1>
        <EmployeeCreateForm onSuccess={handleCreateSuccess} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="p-4 text-gray-500 sm:p-8">
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" aria-live="assertive" className="p-4 text-red-600 sm:p-8">
        Failed to load employees.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          {filteredEmployees && (
            <p className="mt-1 text-sm text-gray-500">
              {filteredEmployees.length}{" "}
              {filteredEmployees.length === 1 ? "employee" : "employees"}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Employee
        </button>
      </div>
      {departments && (
        <div className="mb-4">
          <DepartmentFilter
            departments={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </div>
      )}
      {filteredEmployees && (
        <EmployeesTable
          data={filteredEmployees}
          onRowClick={(employee) => setSelectedEmployeeId(employee.id)}
        />
      )}
    </div>
  );
}

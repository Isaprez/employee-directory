import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import { useGetDepartmentsQuery } from "../../../../shared/api/apiSlice";
import EmployeesTable from "../components/EmployeesTable";
import EmployeeCreateForm from "../components/EmployeeCreateForm";
import DepartmentFilter from "../components/DepartmentFilter";

interface EmployeesPageProps {
  onSelectEmployee: (id: number) => void;
}

export default function EmployeesPage({ onSelectEmployee }: EmployeesPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return undefined;
    let result = employees;
    if (selectedDepartment) {
      result = result.filter((e) => e.department === selectedDepartment);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.firstName.toLowerCase().includes(query) ||
          e.lastName.toLowerCase().includes(query)
      );
    }
    return result;
  }, [employees, selectedDepartment, searchQuery]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleCreateSuccess = useCallback(() => {
    setShowCreateForm(false);
    setSuccessMessage("Employee created successfully.");
  }, []);

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
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-64"
        />
        {departments && (
          <DepartmentFilter
            departments={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        )}
      </div>
      {filteredEmployees && (
        <EmployeesTable
          data={filteredEmployees}
          onRowClick={(employee) => onSelectEmployee(employee.id)}
        />
      )}
    </div>
  );
}


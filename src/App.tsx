import { useState } from "react";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-8">
        <nav className="flex items-center gap-6">
          <span className="text-lg font-semibold text-gray-900">
            Employee Directory
          </span>
          <a
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.preventDefault();
              setSelectedEmployeeId(null);
            }}
          >
            Employees
          </a>
        </nav>
      </header>
      {selectedEmployeeId !== null ? (
        <EmployeeDetailDetailPage
          employeeId={selectedEmployeeId}
          onBack={() => setSelectedEmployeeId(null)}
        />
      ) : (
        <EmployeesPage
          onSelectEmployee={(id) => setSelectedEmployeeId(id)}
        />
      )}
    </div>
  );
}

export default App;

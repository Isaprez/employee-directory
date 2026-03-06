import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage";

function App() {
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
          >
            Employees
          </a>
        </nav>
      </header>
      <EmployeesPage />
    </div>
  );
}

export default App;

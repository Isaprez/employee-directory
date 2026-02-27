import {
  useGetEmployeeDetailByIdQuery,
  useUpdateEmployeeDetailMutation,
} from "../../data/employee-detailApi";
import { useGetDepartmentsQuery } from "../../../employees/data/employeesApi";
import EmployeeDetailForm from "../components/EmployeeDetailForm";

interface EmployeeDetailDetailPageProps {
  employeeId: number;
  onBack?: () => void;
}

export default function EmployeeDetailDetailPage({
  employeeId,
  onBack,
}: EmployeeDetailDetailPageProps) {
  const {
    data: employee,
    isLoading,
    error,
  } = useGetEmployeeDetailByIdQuery(employeeId);
  const { data: departments = [] } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employee details...</p>;
  }

  if (error || !employee) {
    return <p className="p-8 text-red-600">Failed to load employee details.</p>;
  }

  const handleSubmit = async (
    data: Omit<typeof employee, "id">
  ) => {
    await updateEmployee({ id: employee.id, ...data });
    onBack?.();
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            &larr; Back to list
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">
          {employee.firstName} {employee.lastName}
        </h1>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          defaultValues={employee}
          departments={departments}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}

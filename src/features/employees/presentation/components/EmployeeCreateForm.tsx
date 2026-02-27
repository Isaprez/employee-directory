import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useAddEmployeeMutation,
  useGetDepartmentsQuery,
} from "../../data/employeesApi";

const employeeSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  status: z.enum(["active", "inactive"]),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeCreateFormProps {
  onSuccess?: () => void;
}

export default function EmployeeCreateForm({
  onSuccess,
}: EmployeeCreateFormProps) {
  const { data: departments } = useGetDepartmentsQuery();
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      department: "",
      status: "active",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await addEmployee({
        ...data,
        startDate: new Date().toISOString().split("T")[0],
      }).unwrap();
      reset();
      onSuccess?.();
    } catch {
      // mutation error is available via the hook's error state
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const errorClass = "mt-1 text-xs text-red-600";
  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>First Name</label>
          <input {...register("firstName")} className={inputClass} />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Last Name</label>
          <input {...register("lastName")} className={inputClass} />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input type="email" {...register("email")} className={inputClass} />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Position</label>
        <input {...register("position")} className={inputClass} />
        {errors.position && (
          <p className={errorClass}>{errors.position.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Department</label>
        <select {...register("department")} className={inputClass}>
          <option value="">Select a department</option>
          {departments?.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className={errorClass}>{errors.department.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select {...register("status")} className={inputClass}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className={errorClass}>{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create Employee"}
      </button>
    </form>
  );
}

import { apiSlice } from "../../../shared/api/apiSlice";
import type { Employee } from "../domain/employee.types";

const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Employees" as const, id })),
              "Employees",
            ]
          : ["Employees"],
    }),
    addEmployee: builder.mutation<Employee, Omit<Employee, "id">>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation } = employeesApi;

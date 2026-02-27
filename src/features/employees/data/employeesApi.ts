import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, Department } from "../domain/employee.types";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Employees"],
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
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
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

export const {
  useGetEmployeesQuery,
  useGetDepartmentsQuery,
  useAddEmployeeMutation,
} = employeesApi;

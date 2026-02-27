import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, Department } from "../domain/employee.types";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
    }),
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
    }),
  }),
});

export const { useGetEmployeesQuery, useGetDepartmentsQuery } = employeesApi;

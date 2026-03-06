import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Department } from "../../features/employees/domain/employee.types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Employees", "EmployeeDetail", "Departments"],
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
  }),
});

export const { useGetDepartmentsQuery } = apiSlice;

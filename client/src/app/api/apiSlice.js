import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://abc-server.onrender.com/api/v1" }),
  tagTypes: ["Student", "Course"],
  endpoints: (builder) => ({}),
});

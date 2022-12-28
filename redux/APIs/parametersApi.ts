import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parametersApi = createApi({
  reducerPath: "parametersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/adv/" }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getParametersById: builder.query({
      query: (id) => `parameters/${id}`,
    }),
  }),
});

export const { useGetParametersByIdQuery } = parametersApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryResult } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { FormattedParametersData, ParametersData } from "./types";
import { getFormattedParams } from "./helpers";

export const parametersApi = createApi({
  reducerPath: "parametersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/adv/" }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getParametersById: builder.query<
      ParametersData,
      2 | 3 | 4 | null | undefined
    >({
      query: (id) => `parameters/${id}`,
      transformResponse: (
        baseQueryReturnValue: ParametersData,
        meta,
        arg
      ): FormattedParametersData => {
        return getFormattedParams(baseQueryReturnValue).sort((a, b) =>
          b.type.localeCompare(a.type)
        );
      },
    }),
  }),
});

export const { useGetParametersByIdQuery } = parametersApi;

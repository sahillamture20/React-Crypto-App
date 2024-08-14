import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoExchangeApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_CRYPTO_EXCHANGE_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_CRYPTO_EXCHANGE_API_HOST,
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoExchangeApiHeaders });

export const cryptoExchangeApi = createApi({
  //reducerPath - for what this reducer is
  reducerPath: "cryptoExchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangeApi;

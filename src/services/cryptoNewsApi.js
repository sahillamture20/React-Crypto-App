import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_CRYPTO_NEWS_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_CRYPTO_NEWS_API_HOST,
};

const baseUrl = "https://cryptocurrency-news3.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest("/cryptonews/0/0"),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-key': import.meta.env.VITE_CRYPTO_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_CRYPTO_API_HOST
} 

const baseUrl =  'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    //reducerPath - for what this reducer is
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),

        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),

        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        })
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
  } = cryptoApi;
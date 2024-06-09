import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from "../utils/config"
console.log(config.url);

interface Coords { lat: number; lng: number; }

export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: config.url,
    }),
    endpoints: (build) => ({
      getPoint: build.query<Coords, string>({
        query: () => 'points'
      }),
      addPoint: build.mutation<Coords, Partial<Coords>>({
        query: (body) => ({
          url: '',
          method: 'POST',
          body
        })
      })
    })
})

export const {useGetPointQuery, useAddPointMutation} = api
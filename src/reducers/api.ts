import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from "../utils/config"
import { socket } from '../socket';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { CoordinatesResponse } from '../types/types';
//import { socket } from '../socket';

//console.log(config.url);

export type Channel = 'redux' | 'general'

export interface Coords {
  id: number
  lat: number;
  lng: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getMessages: build.query<CoordinatesResponse[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = socket
        ws.addEventListener('message', (event) => {
          updateCachedData((draft) => {
            draft.push(JSON.parse(event.data))
          })
        })
        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})


export const { useGetMessagesQuery } = api
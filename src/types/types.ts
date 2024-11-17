export type Coords = {
  lat: number
  lng: number
}

export type CoordinatesResponse = {
  id: string
  coordinates: Coords
}

export type HexagonsList = {
  id: string,
  coords: Coords[]
}

export type SendMessage = {
  coordinates: Coords
  date: string
  time: string
}
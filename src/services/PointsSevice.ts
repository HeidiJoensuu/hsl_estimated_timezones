import axios from "axios"
import { config } from "../utils/config"

const webSocket = new WebSocket(config.url)
export const sendNewPoint = (coods: { lat: number; lng: number; }) => {
    webSocket.send(JSON.stringify(coods))
}
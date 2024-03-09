import { config } from "../utils/config"

const webSocket = new WebSocket(config.url)

const isOpen = () => { return webSocket.readyState === webSocket.OPEN }

export const openingSocket = () => {
    webSocket.onopen = (event) => {
        console.log("Connected!");
    }
}

export const sendNewPoint = (coords: { lat: number; lng: number; }) => {
    if (!isOpen()) console.log("Ei yhteyttä");
    
    webSocket.send(JSON.stringify(coords))
}

export const recieveInformation = () => {
    webSocket.onmessage = (event) => {
        console.log(event.data)
    }
}
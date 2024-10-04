import { config } from "./utils/config"

export const socket = new WebSocket(`${config.url}`)
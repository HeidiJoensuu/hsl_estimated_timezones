import { MapContainer, TileLayer, useMapEvents, Polygon, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { LeafletMouseEvent } from 'leaflet'
//import { sendNewPoint } from '../services/PointsSevice'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
//import { useGetPointsQuery } from '../reducers/api'
import { useGetMessagesQuery } from '../reducers/api'
import { socket } from '../socket'
import { CoordinatesResponse, Coords, HexagonsList } from '../types/types'

const BasicMap = () => {
    const dispatch = useAppDispatch()
    const { data, error } = useGetMessagesQuery()
    const ws = socket
    //const [addPost] = useAddPointMutation()
    const [jtn, setJtn] = useState(undefined)
    const [dataLength, setDataLength] = useState(0)
    const [markerPosition, setMarkerPosition] = useState<{ lat: number, lng: number } | null>(null)
    const [hexagons, setHexagons] = useState<HexagonsList[]>([])

    useEffect(() => {
        if (data?.length && data.length > 0) {
            if (data.length != hexagons.length) {
                const listToCheck = data.filter(point => !hexagons.find(hexa => hexa.id == point.id))
                listToCheck.forEach(item => DrawPolygon(item))
            }
            
        }
    }, [data])

    console.log("data: ", data);
    
    const Kokeilu = () => {

        const map = useMapEvents({
            click(e) {
                //console.log(typeof(e.latlng), e.latlng);
                SelectionConfimed(e)
            }
        })
        console.log(hexagons);

        if (hexagons.length !== 0) {
            return (
                <>
                    {hexagons.map(hexa =>
                        <Polygon pathOptions={{ fillColor: getColour(), fillOpacity: 0.4, color: undefined, fillRule: "nonzero" }} positions={hexa.coords} />
                    )}
                </>
            )
        }
        return null
    }

    const getColour = () => {
        const colours = ["green", "#3388ff", "purple", "red", "black"]
        return colours[Math.floor(Math.random() * colours.length)]
    }

    const handleAddPost = async (coords: { lat: number; lng: number; }) => {
        try {
            ws.send(JSON.stringify(coords))
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Creates popup to selected point.
     */
    const PointSelection = () => {

    }

    const SelectionConfimed = (e: LeafletMouseEvent) => {
        DrawPolygon({id: "aloitus", coordinates: e.latlng})
        handleAddPost(e.latlng)
    }

    /**
     * Draws a new polygon
     * @param markerPosition 
     */
    const DrawPolygon = (markerPosition: CoordinatesResponse) => {
        console.log(markerPosition);

        const r: number = 0.0017
        const a = 2 * Math.PI / 6;
        const newDraw: Coords[] = []
        for (let i = 0; i < 6; i++) {
            newDraw.push({ lat: markerPosition.coordinates.lat + r * Math.cos(a * i), lng: markerPosition.coordinates.lng + r * Math.sin(a * i) })
        }
        setHexagons(hexagons => [...hexagons, {id: markerPosition.id, coords: newDraw}])
    }

    return (
        <div style={{ height: "400px" }}>
            <MapContainer center={[60.230147, 24.808932]} zoom={13} scrollWheelZoom={true} className="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Kokeilu />
            </MapContainer>
        </div>
    )
}

export default BasicMap
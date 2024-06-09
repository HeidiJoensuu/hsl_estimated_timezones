import { MapContainer, TileLayer, useMapEvents, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { LeafletMouseEvent } from 'leaflet'
//import { sendNewPoint } from '../services/PointsSevice'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
//import { useGetPointsQuery } from '../reducers/api'
import {useAddPointMutation, useGetPointQuery} from '../reducers/api'

const BasicMap = () => {
    const dispatch = useAppDispatch()
    const { data, error } = useGetPointQuery('')
    const [addPost] = useAddPointMutation()
    const [jtn, setJtn] = useState(undefined)
    const [markerPosition, setMarkerPosition] = useState<{lat: number, lng:number}|null>(null)
    const [hexagons, setHexagons] = useState<({ lat: number; lng: number; }[])[]>([])

    useEffect(() => {
        if (markerPosition) DrawPolygon(markerPosition)
    }, [markerPosition])
    //console.log(data);
    


    const Kokeilu = () =>{
        const map = useMapEvents({
            click(e) {
                console.log(typeof(e.latlng), e.latlng);
                SelectionConfimed(e)
            }
        })
        if (hexagons.length !== 0){
            return (
                <Polygon pathOptions={{ fillColor: 'purple', fillOpacity:0.4, color:undefined, /*fillRule:"nonzero"*/}} positions={hexagons} />
            )
        }
        return null
    }
    const handleAddPost = async (coords: { lat: number; lng: number; }) => {
        try {
            console.log("yritys 1:", coords);
            await addPost(coords)

        } catch (error) {
          console.log(error);
        }
      }
    
    /**
     * Creates popup to selected point.
     */
    const PointSelection = () => {

    }

    const SelectionConfimed = (e: LeafletMouseEvent) =>{
        setMarkerPosition(e.latlng)
        //sendNewPoint(e.latlng)
        handleAddPost(e.latlng)
    }

    /**
     * Draws a new polygon
     * @param markerPosition 
     */
    const DrawPolygon = (markerPosition: {lat: number, lng:number}) => {
        const r: number = 0.0017
        const a = 2 * Math.PI / 6;
        const newDraw: {lat: number, lng:number}[] = []
        for (let i = 0; i < 6; i++) {
            newDraw.push({lat: markerPosition.lat + r * Math.cos(a * i), lng:markerPosition.lng + r * Math.sin(a * i)})
        }
        setHexagons(hexagons => [...hexagons, newDraw])
    }

    return (
        <div style={{height:"400px"}}>
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
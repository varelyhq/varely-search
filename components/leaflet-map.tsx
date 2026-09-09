"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// @ts-ignore
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Flex } from "@/components/ui/flex";

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type Props = {
    lat: number;
    lon: number;
    zoom: number;
    title: string;
};

export function LeafletMap({ lat, lon, zoom, title }: Props) {
    return (
        <Flex className='w-full h-87.5'>
            <MapContainer
                key={`${lat}-${lon}`}
                // @ts-ignore
                center={[lat, lon]}
                zoom={zoom}
                scrollWheelZoom={false}
                className="border border-border w-full h-87.5"
            >
                <TileLayer
                    // @ts-ignore
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[lat, lon]}
                    // @ts-ignore
                    icon={markerIcon}
                >
                    <Popup>{title}</Popup>
                </Marker>
            </MapContainer>
        </Flex>
    );
}
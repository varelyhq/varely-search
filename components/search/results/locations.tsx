'use client';

import { Button } from "@/components/ui/button";
import { View } from "@/components/view";
import { LocationResult, LocationsType } from "@/types/search-type";
import { ArrowUpRight, Map } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
// import { LeafletMap } from "@/components/leaflet-map";

const LeafletMap = dynamic(
    () => import("@/components/leaflet-map").then(mod => mod.LeafletMap),
    { ssr: false }
);

export function Location({ data }: { data: LocationResult }) {

    const [lat, lon] = data.coordinates;

    const googleMapsHref = `https://www.google.com/maps/dir/?api=1&destination=${data.coordinates[0]},${data.coordinates[1]}`;

    return (
        <View className="gap-2">
            <View className="flex-row items-center gap-2">
                <Map size={16} className="text-muted-foreground" />
                <h3 className="font-medium">{data.title}</h3>
                <Link href={googleMapsHref} target='_blank' className="ml-auto">
                    <Button variant='secondary' size='sm'>
                        {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_772_376)"><path d="M8 6.54543V9.64361H12.3054C12.1164 10.64 11.549 11.4836 10.6981 12.0509L13.2945 14.0655C14.8072 12.6692 15.68 10.6182 15.68 8.18187C15.68 7.61461 15.6291 7.0691 15.5345 6.54551L8 6.54543Z" fill="#4285F4"></path><path d="M3.51625 9.52267L2.93067 9.97093L0.85791 11.5854C2.17427 14.1963 4.87225 16 7.9995 16C10.1594 16 11.9703 15.2873 13.294 14.0655L10.6976 12.0509C9.98492 12.5309 9.07582 12.8218 7.9995 12.8218C5.91951 12.8218 4.15229 11.4182 3.51952 9.52729L3.51625 9.52267Z" fill="#34A853"></path><path d="M0.858119 4.41455C0.312695 5.49087 0 6.70543 0 7.99996C0 9.29448 0.312695 10.509 0.858119 11.5854C0.858119 11.5926 3.51998 9.51991 3.51998 9.51991C3.35998 9.03991 3.26541 8.53085 3.26541 7.99987C3.26541 7.46889 3.35998 6.95984 3.51998 6.47984L0.858119 4.41455Z" fill="#FBBC05"></path><path d="M7.99966 3.18545C9.17786 3.18545 10.2251 3.59271 11.0615 4.37818L13.3524 2.0873C11.9633 0.792777 10.1597 0 7.99966 0C4.87242 0 2.17427 1.79636 0.85791 4.41455L3.51969 6.48001C4.15238 4.58908 5.91968 3.18545 7.99966 3.18545Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_772_376"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg> */}
                        <img className="h-4 w-auto" src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Google_Maps_Logo.svg/960px-Google_Maps_Logo.svg.png' />
                        <ArrowUpRight />
                    </Button>
                </Link>
            </View>
            <View className="rounded-lg overflow-hidden">
                <LeafletMap key={crypto.randomUUID()} lat={lat} lon={lon} zoom={data.zoom_level} title={data.title} />
            </View>

        </View>
    )
}

export function Locations({ data }: { data: LocationsType }) {

    return (
        <View>
            {[data.results[0]].map((location, index) => (
                <Location key={index} data={location} />
            ))}
        </View>
    )
}
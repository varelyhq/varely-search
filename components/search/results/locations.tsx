'use client';

import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Section, SectionHeader, SectionIcon, SectionTitle } from "@/components/ui/section";
import { LocationResult, LocationsType } from "@/types/search-type";
import { ArrowUpRight, Map } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const LeafletMap = dynamic(
    () => import("@/components/leaflet-map").then(mod => mod.LeafletMap),
    { ssr: false }
);

export function Location({ data }: { data: LocationResult }) {

    const [lat, lon] = data.coordinates

    const googleMapsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

    return (
        <Section>
            <SectionHeader>
                <SectionIcon icon={Map} />
                <SectionTitle>{data.title}</SectionTitle>
                <Link href={googleMapsHref} target='_blank' className="ml-auto">
                    <Button variant='secondary' size='sm'>
                        <Image width={192} height={37} className="h-4 w-auto" src='/images/google-maps-logo.webp' alt="Google Maps Logo" />
                        <ArrowUpRight />
                    </Button>
                </Link>
            </SectionHeader>
            <Flex className="rounded-4xl overflow-hidden">
                <LeafletMap key={crypto.randomUUID()} lat={lat} lon={lon} zoom={data.zoom_level} title={data.title} />
            </Flex>
        </Section>
    )
}

export function Locations({ data }: { data: LocationsType }) {

    return (
        <Flex>
            {[data.results[0]].map((location, index) => (
                <Location key={index} data={location} />
            ))}
        </Flex>
    )
}
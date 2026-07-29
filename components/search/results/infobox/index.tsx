import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { View } from "@/components/view";
import { ExternalProfile, InfoboxResult, InfoboxType, LocationResult, Profile, Rating } from "@/types/search-type";
import { Globe, Mail, MapPin, Phone, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InfoboxGallery } from "./infobox-gallery";
import { InfoboxAttributes } from "./infobox-attributes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function InfoboxTitle({ title, family_friendly }: { title: string, family_friendly: boolean }) {
    return (
        <View className="flex-row gap-2 items-center">
            <h2 className="text-lg font-medium">{title}</h2>

            {family_friendly ?
                <Tooltip>
                    <TooltipTrigger><Smile size={16} className="text-green-500" /></TooltipTrigger>
                    <TooltipContent>
                        This search is Family Friendly
                    </TooltipContent>
                </Tooltip>
                :
                'No'
            }
        </View>
    )
}

function InfoboxDescription({ description }: { description: string }) {
    return (
        <p className="text-muted-foreground">{description}</p>
    )
}

function InfoboxWebsiteUrl({ website_url }: { website_url?: string }) {

    if (!website_url) return null

    return (
        <Link href={website_url} className="mt-1">
            <View className="flex-row gap-1 items-center">
                <Globe size={12} className="text-blue-500" />
                <span className="text-blue-500 text-sm">
                    {website_url}
                </span>
            </View>
        </Link>
    )
}

function InfoboxLongDescription({ url, long_desc }: { url: string, long_desc: string }) {
    return (
        <p className="text-muted-foreground">
            {long_desc} {' '}
            <Link href={url}>
                <span className="text-blue-500">
                    Czytaj więcej
                </span>
            </Link>
        </p>
    )
}

function InfoboxRatings({ ratings }: { ratings: Rating[] }) {

    if (!ratings.length) return null

    return (
        <View>
            {ratings && ratings.map((rating, rating_index) => (
                <View key={rating_index}>
                    {rating.ratingValue}
                </View>
            ))}
        </View>
    )
}

function InfoboxProfiles({ profiles }: { profiles: Profile[] }) {

    if (!profiles.length) return null

    return (
        <View className="flex-row flex-wrap gap-2">
            {profiles && profiles.map((profile, profile_index) => (
                <Link key={profile_index} href={profile.url} title={profile.name}>
                    <View className="flex-row gap-2 p-1 border border-border rounded-lg">
                        <Image src={profile.img} alt={profile.name} width={16} height={16} className="rounded" />
                    </View>
                </Link>
            ))}
        </View>
    )
}

function InfoboxProviders({ providers }: { providers: ExternalProfile[] }) {

    if (!providers.length) return null

    return (
        <View className="mt-4 px-5">
            <span className="text-xs">Źródła</span>
            <View className="flex-row gap-2">
                {providers.map((provider, provider_index) => (
                    <View key={provider_index} className="flex-row gap-2 items-center">
                        <Image src={provider.img} alt={provider.name} width={16} height={16} className="rounded-lg" />
                        <span className="text-xs text-muted-foreground">{provider.name}</span>
                    </View>
                ))}
            </View>
        </View>
    )
}

function InfoboxLocation({ location }: { location?: LocationResult }) {

    if (!location) return null

    return (
        <View className="gap-2">
            <View className="flex-row items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{location.postal_address.displayAddress}</span>
            </View>
            {location.contact.telephone && (
                <Link href={'tel:' + location.contact.telephone}>
                <View className="flex-row items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span className="text-xs text-blue-600">{location.contact.telephone}</span>
                </View>
                </Link>
            )}
            {location.contact.email && (
                <Link href={'mailto:' + location.contact.telephone}>
                <View className="flex-row items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    {location.contact.email}
                </View>
                </Link>
            )}
        </View>
    )
}

function Infobox({ data }: { data: InfoboxResult }) {

    return (
        <>
            <Card className="max-w-100">
                <CardContent className="flex flex-col gap-4">

                    <View className="gap-1">
                        <InfoboxTitle title={data.title} family_friendly={data.family_friendly} />
                        <InfoboxDescription description={data.description} />
                        <InfoboxWebsiteUrl website_url={data.website_url} />
                    </View>
                    <InfoboxGallery images={data.images} />
                    <InfoboxLocation location={data.location} />
                    <InfoboxLongDescription url={data.url} long_desc={data.long_desc} />
                    <InfoboxAttributes attributes={data.attributes} />
                    <InfoboxRatings ratings={data.ratings} />
                    <Separator />
                    <InfoboxProfiles profiles={data.profiles} />

                </CardContent>
            </Card>
            <InfoboxProviders providers={data.providers} />
        </>
    )
}

export function Infoboxes({ data }: { data: InfoboxType }) {

    const infobox = data
    if (infobox?.type !== 'graph') return null;

    return (
        <View>
            {[infobox.results[0]].map((e, index) => (
                <Infobox key={index} data={e} />
            ))}
        </View>
    )
}
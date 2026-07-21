import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { View } from "@/components/view";
import { InfoboxType } from "@/types/SearchType";
import { Globe, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Infobox({ infobox }: { infobox: InfoboxType }) {

    if (infobox?.type !== 'graph') return null;

    return (
        <View>
            {infobox.results.map((e, index) => (
                <View key={index}>
                    <Card className="max-w-100">
                        <CardContent>
                            <View className="flex-row gap-2 items-center">
                                <h2 className="text-lg font-medium">{e.title}</h2>

                                {e.family_friendly ?
                                    <Smile size={16} className="text-green-500" />
                                    :
                                    'No'
                                }
                            </View>
                            <p className="text-muted-foreground">{e.description}</p>

                            <Link href={e.website_url} className="mt-1">
                                <View className="flex-row gap-1 items-center">
                                    <Globe size={12} className="text-blue-500" />
                                    <span className="text-blue-500 text-sm">
                                        {e.website_url}
                                    </span>
                                </View>
                            </Link>

                            <View className="my-4 flex-row gap-2 grid grid-cols-2">
                                {e.images.map((image, image_index) => (
                                    <View key={image_index} className="relative aspect-[4/3]">
                                        <Image fill src={image.src} alt={image.alt || ''} className="object-cover rounded-lg" />
                                    </View>
                                ))}
                            </View>

                            <View className="mb-4">
                                <p className="text-muted-foreground">
                                    {e.long_desc} {' '}
                                    <Link href={e.url}>
                                        <span className="text-blue-500">
                                            Czytaj więcej
                                        </span>
                                    </Link>
                                </p>
                            </View>

                            <View className="gap-2">
                                <h4 className="font-medium">Fakty</h4>
                                {e.attributes.map((attribute, attribute_index) => (
                                    <View key={attribute_index} className="">
                                        <span className="font-medium text-xs">
                                            {attribute[0]}
                                        </span>
                                        {
                                            attribute[1] &&
                                            <span
                                                className="text-xs text-muted-foreground"
                                                dangerouslySetInnerHTML={{ __html: attribute[1] }}
                                            />
                                        }
                                    </View>
                                ))}
                            </View>

                            <View>
                                {e.ratings.map((rating, rating_index) => (
                                    <View key={rating_index}>
                                        {rating}
                                    </View>
                                ))}
                            </View>

                            <Separator className='my-5' />

                            <View className="flex-row flex-wrap gap-2">
                                {e.profiles.map((profile, profile_index) => (
                                    <Link key={profile_index} href={profile.url} title={profile.name}>
                                        <View className="flex-row gap-2 p-1 border border-border rounded-lg">
                                            <Image src={profile.img} alt={profile.name} width={16} height={16} className="rounded" />
                                        </View>
                                    </Link>
                                ))}
                            </View>

                        </CardContent>
                    </Card>
                    <View className="mt-4 px-5">
                        <span className="text-xs">Źródła</span>
                        <View className="flex-row gap-2">
                            {e.providers.map((provider, provider_index) => (
                                <View key={provider_index} className="flex-row gap-2 items-center">
                                    <Image src={provider.img} alt={provider.name} width={16} height={16} className="rounded-lg" />
                                    <span className="text-xs text-muted-foreground">{provider.name}</span>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
            {/* url // https://en.wikipedia.org/wiki/PewDiePie
        is_source_local // false
        is_source_both // false */}

        </View>
    )
}
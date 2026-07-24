import { continents, country_translations } from "@/constants/languages";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { View } from "../view";
import React from "react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";


export function LanguageSwitcher() {

    const region = usePreferencesStore(store => store.region);
    const setRegion = usePreferencesStore(store => store.setRegion);

    const onValueChange = (value: any) => {
        if(value) setRegion(value)
    }

    return (
        <Select value={region} onValueChange={onValueChange}>

            <SelectTrigger>
                <SelectValue placeholder="Region">
                    <img
                        src={`https://flagcdn.com/${region.toLowerCase()}.svg`}
                        alt={region}
                        className="h-5 w-5 rounded-full object-cover"
                    />
                    {country_translations[region]}
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="w-64 max-h-128">
                <SelectGroup>
                    <SelectLabel className='sticky top-0 bg-popover z-100'>Wybierz język wyszukiwania</SelectLabel>

                    {continents.map(continent => (
                        <React.Fragment key={continent.id}>
                            <SelectLabel>{continent.label}</SelectLabel>

                            {continent.countries.map(lang => (
                                <SelectItem key={lang} value={lang}>
                                    <View className="flex-1 flex-row items-center gap-2">
                                        <View className="relative overflow-hidden rounded">
                                            <img
                                                src={`https://flagcdn.com/${lang.toLowerCase()}.svg`}
                                                alt={lang}
                                                className="h-5 w-5 rounded-full object-cover"
                                            />
                                        </View>
                                        {country_translations[lang]}
                                    </View>
                                </SelectItem>
                            ))}

                        </React.Fragment>
                    ))}

                </SelectGroup>
            </SelectContent>

        </Select>
    )
}
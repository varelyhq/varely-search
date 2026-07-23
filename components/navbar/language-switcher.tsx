import { continents, country_translations } from "@/constants/languages";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { View } from "../view";
import React from "react";


export function LanguageSwitcher() {



    return (
        <Select value='PL'>

            <SelectTrigger>
                <SelectValue placeholder="Language">
                    <img
                        src={`https://flagcdn.com/${'pl'}.svg`}
                        alt={'PL'}
                        className="h-3.5 w-auto rounded"
                    />
                    {country_translations['PL']}
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="w-64 max-h-128">
                <SelectGroup>
                    <SelectLabel className='sticky top-0 bg-white z-100'>Wybierz język wyszukiwania</SelectLabel>

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
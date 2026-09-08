'use client'

import { Palette } from "lucide-react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {

    const { theme, setTheme } = useTheme()

    const setPreferencesTheme = usePreferencesStore(s => s.setTheme)

    const onValueChange = (value: any) => {
        setTheme(value)
        setPreferencesTheme(value)
    }

    const translations = {
        light: 'Jasny',
        dark: 'Ciemny',
    }

    return (
        <Select value={theme} onValueChange={onValueChange}>
            <SelectTrigger>
                <Palette />
                {/* @ts-ignore */}
                {translations[theme]}
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='light'>Jasny</SelectItem>
                    <SelectItem value='dark'>Ciemny</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
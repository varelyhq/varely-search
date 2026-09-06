'use client'

import { Palette } from "lucide-react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {

    const { setTheme } = useTheme()

    const theme = usePreferencesStore(s => s.theme);
    const setPreferencesTheme = usePreferencesStore(s => s.setTheme);

    const onValueChange = (value: any) => {
        if (value) setPreferencesTheme(value)
        if (value !== 'system') setTheme(value)
    }

    const translations = {
        system: 'System',
        light: 'Jasny',
        dark: 'Ciemny'
    }

    return (
        <Select value={theme} onValueChange={onValueChange}>
            <SelectTrigger>
                <Palette />
                {translations[theme]}
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='system'>System</SelectItem>
                    <SelectItem value='light'>Jasny</SelectItem>
                    <SelectItem value='dark'>Ciemny</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
import { Palette } from "lucide-react";
import { Button } from "../ui/button";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";

export function ThemeSwitcher() {

    const theme = usePreferencesStore(s => s.theme);
    const setTheme = usePreferencesStore(s => s.setTheme);

    const onValueChange = (value: any) => {
        if (value) setTheme(value)
        const body = document.documentElement
        body.classList.remove('dark', 'light')
        if (value !== 'system') body.classList.add(value)
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
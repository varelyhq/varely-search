import { Settings } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { View } from "../view";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { search_lang } from "@/constants/languages";
import { LanguageSwitcher } from "./language-switcher";

function SafeSearchSelect() {

    const safeSearch = usePreferencesStore(store => store.safeSearch);
    const setSafeSearch = usePreferencesStore(store => store.setSafeSearch);

    const onValueChange = (value: 'strict' | 'moderate' | 'off' | null) => {
        if (value) setSafeSearch(value)
    }

    const translations = {
        strict: 'Ściśle',
        moderate: 'Umiarkowanie',
        off: 'Wyłączony'
    }

    return (
        <View className="gap-3">
            <Label>Bezpieczne wyszukiwanie</Label>
            <Select value={safeSearch} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder='Bezpieczne wyszukiwanie'>
                        {translations[safeSearch]}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='strict'>
                            Ściśle
                        </SelectItem>
                        <SelectItem value='moderate'>
                            Umiarkowanie
                        </SelectItem>
                        <SelectItem value='off'>
                            Wyłączone
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </View>
    )
}

function SearchResultsLanguage() {

    const language = usePreferencesStore(store => store.language);
    const setLanguage = usePreferencesStore(store => store.setLanguage);

    const onValueChange = (value: any) => {
        if (value) setLanguage(value)
    }

    return (
        <View className="gap-3">
            <View className="gap-1">
                <Label>Język interfejsu</Label>
                <span className="text-xs text-muted-foreground">Domyślnie na podstawie regionu</span>
            </View>
            <Select value={language} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder='domyślnie'>
                        {language === 'default' ? 'Domyślnie' : language}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='default'>
                            Domyślnie
                        </SelectItem>
                        {search_lang.map(lang => (
                            <SelectItem key={lang} value={lang}>
                                {lang}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </View>
    )
}

export function SettingsSheet() {

    return (
        <Sheet>
            <SheetTrigger>
                <Button size='icon' variant='outline'>
                    <Settings />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Ustawienia</SheetTitle>
                    <SheetDescription>Dostostuj swoje doświadczenie.</SheetDescription>
                </SheetHeader>

                <View className="px-6 gap-6">
                    <SafeSearchSelect />
                    <View className="gap-3">
                        <Label>Region pochodzenia wyników</Label>
                        <LanguageSwitcher />
                    </View>
                    <SearchResultsLanguage />
                    <Label>Odpowiedź z użyciem sztucznej inteligencji</Label>
                </View>

                <SheetFooter>
                    <SheetClose render={<Button type="submit">Gotowe</Button>} />
                    <SheetClose render={<Button variant="outline">Zamknij</Button>} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
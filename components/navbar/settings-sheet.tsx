import { Settings } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { View } from "../view";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { search_lang } from "@/constants/languages";
import { LanguageSwitcher } from "./language-switcher";
import { Flex } from "../ui/flex";

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
                <SelectContent alignItemWithTrigger={false}>
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
                <SelectContent alignItemWithTrigger={false}>
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

function AISwitcher() {

    const ai_summary = usePreferencesStore(store => store.ai_summary)
    const setAiSummary = usePreferencesStore(store => store.setAiSummary)

    return (
        <Flex className="flex-row gap-2">
            <Button size='sm' variant={ai_summary ? 'default' : 'secondary'} onClick={() => setAiSummary(true)}>Tak</Button>
            <Button size='sm' variant={ai_summary ? 'secondary' : 'default'} onClick={() => setAiSummary(false)}>Nie</Button>
        </Flex>
    )
}

export function SettingsSheet() {

    return (
        <Sheet>
            <SheetTrigger render={<Button size='icon' variant='outline'><Settings /></Button>}>
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
                    <View className="gap-3">
                        <Label>Odpowiedź z użyciem sztucznej inteligencji</Label>
                        <AISwitcher />
                    </View>
                </View>

                <SheetFooter>
                    <SheetClose render={<Button type="submit">Gotowe</Button>} />
                    <SheetClose render={<Button variant="outline">Zamknij</Button>} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
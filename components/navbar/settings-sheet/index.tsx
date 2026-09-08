import { Settings } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet"
import { Button } from "../../ui/button"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { search_lang } from "@/constants/languages";
import { LanguageSwitcher } from "./language-switcher";
import { Flex } from "../../ui/flex";
import { SafeSearchSelect } from "../safe-search-select";
import { Field, FieldLabel } from "../../ui/field";

function SearchResultsLanguage() {

    const language = usePreferencesStore(store => store.language);
    const setLanguage = usePreferencesStore(store => store.setLanguage);

    const onValueChange = (value: any) => {
        if (value) setLanguage(value)
    }

    return (
        <Field>
            <Flex className="gap-1">
                <FieldLabel>Język interfejsu</FieldLabel>
                <span className="text-xs text-muted-foreground">Domyślnie na podstawie regionu</span>
            </Flex>
            <Flex className="flex-row">
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
            </Flex>
        </Field>
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

                <Flex className="px-6 gap-6">
                    <SafeSearchSelect />
                    <Field>
                        <FieldLabel>Region pochodzenia wyników</FieldLabel>
                        <Flex className="flex-row">
                            <LanguageSwitcher />
                        </Flex>
                    </Field>
                    <SearchResultsLanguage />
                    <Field>
                        <FieldLabel>Odpowiedzi z użyciem sztucznej inteligencji</FieldLabel>
                        <AISwitcher />
                    </Field>
                </Flex>

                <SheetFooter>
                    <SheetClose render={<Button type="submit">Gotowe</Button>} />
                    <SheetClose render={<Button variant="outline">Zamknij</Button>} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
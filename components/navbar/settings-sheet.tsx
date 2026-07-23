import { Settings } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { View } from "../view";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function SafeSearchSelect() {

    const safeSearch = usePreferencesStore(store => store.safeSearch);
    const setSafeSearch = usePreferencesStore(store => store.setSafeSearch);

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder='Opcje Safesearch' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='strict'>
                        Strict
                    </SelectItem>
                    <SelectItem value='on'>
                        Włączone
                    </SelectItem>
                    <SelectItem value='off'>
                        Wyłączone
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
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

                <View className="px-6">
                    <SafeSearchSelect />
                </View>

                <SheetFooter>
                    <Button type="submit">Zapisz zmiany</Button>
                    <SheetClose render={<Button variant="outline">Zamknij</Button>} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
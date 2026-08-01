'use client'

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { useChatStore } from "@/stores/useChatStore"
import { useSearchStore } from "@/stores/useSearchStore"
import { KeyboardEvent, useState } from "react"

export function SendMessageBar() {

    const query = useSearchStore(s => s.query)
    const sendMessage = useChatStore(s => s.sendMessage)

    const [message, setMessage] = useState(query || '')

    const hasError = message.length > 300

    const handleSend = () => {
        if (!message || hasError) return
        sendMessage(message)
        setMessage('')
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <Field data-invalid={hasError}>
            {hasError && <FieldLabel htmlFor="ai-message-textarea">Twoja wiadomość jest za długa</FieldLabel>}
            <InputGroup>
                <InputGroupTextarea
                    aria-invalid={hasError}
                    id="ai-message-textarea"
                    placeholder="O co chcesz dziś zapytać?"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputGroupAddon align="block-end">
                    <InputGroupText>{message.length}/300</InputGroupText>
                    <InputGroupButton
                        onClick={handleSend}
                        disabled={!message || hasError}
                        variant="default"
                        size="sm"
                        className="ml-auto"
                    >
                        Wyślij
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
                AI może popełniać błędy. Sprawdzaj odpowiedzi 2 razy.
                Asystent nie pamięta poprzednich wiadomości. Zawsze zadawaj dokładne pytania.
            </FieldDescription>
        </Field>
    )
}
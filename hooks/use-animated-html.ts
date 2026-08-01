import { useEffect, useMemo, useRef, useState } from "react"

function tokenize(html: string): string[] {
    const tokens = html.match(/(<[^>]+>)|(\s+)|([^\s<]+)/g) ?? []
    const units: string[] = []
    let buffer = ""

    for (const token of tokens) {
        buffer += token
        const isTag = /^<[^>]+>$/.test(token)
        const isSpace = /^\s+$/.test(token)
        if (!isTag && !isSpace) {
            units.push(buffer)
            buffer = ""
        }
    }
    if (buffer) units.push(buffer)
    return units
}

export function useAnimatedHtml(html: string, active: boolean, speedMs = 35) {
    const units = useMemo(() => tokenize(html), [html])
    const [count, setCount] = useState(active ? 0 : units.length)

    useEffect(() => {
        if (!active) {
            setCount(units.length)
            return
        }

        setCount(0)
        let i = 0
        const id = setInterval(() => {
            i++
            setCount(i)
            if (i >= units.length) clearInterval(id)
        }, speedMs)

        return () => clearInterval(id)
    }, [html, active])

    return {
        visibleHtml: units.slice(0, count).join(""),
        isDone: count >= units.length,
    }
}
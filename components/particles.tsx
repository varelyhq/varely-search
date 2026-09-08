'use client'

import { useTheme } from "next-themes"
import { Particles as ParticlesBase } from "./ui/particles"

export function Particles() {

    const { theme } = useTheme()

    return (
        <ParticlesBase className="absolute inset-0" color={theme === 'light' ? "#000" : '#fff'} />
    )
}
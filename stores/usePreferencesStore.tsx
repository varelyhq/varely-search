import { countries, search_lang } from '@/constants/languages'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Language = typeof search_lang[number] | 'default'
export type Region = typeof countries[number]
export type SafeSearch = 'off' | 'moderate' | 'strict'
export type Theme = 'light' | 'dark' | 'system'

type PreferencesState = {
  language: Language
  region: Region
  safeSearch: SafeSearch
  theme: Theme
  ai_summary: boolean

  // actions
  setLanguage: (lang: Language) => void
  setRegion: (region: Region) => void
  setSafeSearch: (level: SafeSearch) => void
  setTheme: (theme: Theme) => void
  setAiSummary: (ai_summary: boolean) => void
  reset: () => void
}

const defaults = {
  language: 'pl' as Language,
  region: 'PL' as Region,
  safeSearch: 'moderate' as SafeSearch,
  theme: 'system' as Theme,
  ai_summary: false
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaults,

      setLanguage: language => set({ language }),
      setRegion: region => set({ region }),
      setSafeSearch: safeSearch => set({ safeSearch }),
      setTheme: theme => set({ theme }),
      setAiSummary: ai_summary => set({ ai_summary }),
      reset: () => set(defaults),
    }),
    {
      name: 'varely-preferences',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        language: state.language,
        region: state.region,
        safeSearch: state.safeSearch,
        theme: state.theme,
        ai_summary: state.ai_summary,
      }),
    }
  )
)
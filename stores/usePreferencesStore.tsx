import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Language = 'pl' | 'en' | 'de' | 'fr'
type Region = 'PL' | 'US' | 'DE' | 'GB'
type SafeSearch = 'off' | 'moderate' | 'strict'
type Theme = 'light' | 'dark' | 'system'

interface PreferencesState {
  language: Language
  region: Region
  safeSearch: SafeSearch
  theme: Theme
  resultsPerPage: number

  // actions
  setLanguage: (lang: Language) => void
  setRegion: (region: Region) => void
  setSafeSearch: (level: SafeSearch) => void
  setTheme: (theme: Theme) => void
  setResultsPerPage: (count: number) => void
  reset: () => void
}

const defaults = {
  language: 'pl' as Language,
  region: 'PL' as Region,
  safeSearch: 'moderate' as SafeSearch,
  theme: 'system' as Theme,
  resultsPerPage: 10,
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaults,

      setLanguage: (language) => set({ language }),
      setRegion: (region) => set({ region }),
      setSafeSearch: (safeSearch) => set({ safeSearch }),
      setTheme: (theme) => set({ theme }),
      setResultsPerPage: (resultsPerPage) => set({ resultsPerPage }),
      reset: () => set(defaults),
    }),
    {
      name: 'varely-preferences',        // klucz w localStorage
      storage: createJSONStorage(() => localStorage),

      // opcjonalnie: zapisuj tylko wybrane pola (np. pomiń theme jeśli nie chcesz)
      partialize: (state) => ({
        language: state.language,
        region: state.region,
        safeSearch: state.safeSearch,
        theme: state.theme,
        resultsPerPage: state.resultsPerPage,
      }),
    }
  )
)
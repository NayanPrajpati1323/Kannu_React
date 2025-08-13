import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string
  country: string
}

const languages: Language[] = [
  { code: "e", name: "English", flag: "🇬", country: "U" },
  { code: "e", name: "Español", flag: "🇪", country: "E" },
  { code: "f", name: "Français", flag: "🇫", country: "F" }
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    // Here you can add actual language switching logic
    // For example, update i18n locale, localStorage, etc.
    localStorage.setItem("selectedLanguage", language.code)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
          <span className="text-lg">{selectedLanguage.flag}</span>
          <span className="hidden sm:inline text-sm font-medium">{selectedLanguage.country}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center gap-3 cursor-pointer ${
              selectedLanguage.code === language.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">{language.country}</span>
            </div>
            {selectedLanguage.code === language.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

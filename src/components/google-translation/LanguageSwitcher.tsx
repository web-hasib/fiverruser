// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/immutability */

"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedLang = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLanguage(storedLang);

    document.cookie = `googtrans=/en/${storedLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (newLang: string) => {
    if (!newLang || newLang === selectedLanguage) {
      setIsOpen(false);
      return;
    }

    localStorage.setItem("selectedLanguage", newLang);
    setSelectedLanguage(newLang);

    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;

    document.cookie = `googtrans=/en/${newLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;

    window.location.reload();
  };

  const languageFlags: Record<string, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    ar: "🇸🇦",
    pt: "🇵🇹",
    hi: "🇮🇳",
    bn: "🇧🇩",
    iu: "🇨🇦",
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5 cursor-pointer border border-border transition-colors hover:bg-secondary/80 notranslate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg leading-none select-none">
          {languageFlags[selectedLanguage] || "🌐"}
        </span>
        <span className="text-foreground text-sm font-medium uppercase">
          {selectedLanguage}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 mt-1 w-40 bg-card rounded-md shadow-lg z-50 border border-border notranslate overflow-hidden"
        >
          <ul className="py-1 max-h-64 overflow-y-auto">
            {Object.entries(languageFlags).map(([code, flag]) => (
              <li key={code}>
                <button
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted cursor-pointer transition-colors duration-150 ${
                    selectedLanguage === code
                      ? "bg-secondary text-primary font-bold"
                      : "text-foreground"
                  }`}
                  onClick={() => handleChange(code)}
                >
                  <span className="text-lg leading-none">{flag}</span>
                  <span className="uppercase text-sm">{code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

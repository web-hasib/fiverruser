// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/immutability */

"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const updateCookie = (cookieValue: string) => {
  document.cookie = cookieValue;
};

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      const storedLang = localStorage.getItem("selectedLanguage") || "en";
      setSelectedLanguage(storedLang);

      updateCookie(
        `googtrans=/en/${storedLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`,
      );
    }, 0);

    return () => clearTimeout(timer);
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

    updateCookie("googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
    updateCookie(
      `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`,
    );

    updateCookie(
      `googtrans=/en/${newLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`,
    );

    window.location.reload();
  };

  const languageFlags: Record<string, string> = {
    en: "gb",
    hu: "hu",
    // es: "es",
    // fr: "fr",
    // de: "de",
    // ar: "sa",
    // pt: "pt",
    // hi: "in",
    // bn: "bd",
    // iu: "ca",
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5 cursor-pointer border border-border transition-colors hover:bg-secondary/80 notranslate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center text-lg leading-none select-none">
          {languageFlags[selectedLanguage] ? (
            <img
              src={`https://flagcdn.com/w40/${languageFlags[selectedLanguage]}.png`}
              alt={selectedLanguage}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            "🌐"
          )}
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
            {Object.entries(languageFlags).map(([code, flagCode]) => (
              <li key={code}>
                <button
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted cursor-pointer transition-colors duration-150 ${
                    selectedLanguage === code
                      ? "bg-secondary text-blue-600 font-bold"
                      : "text-foreground"
                  }`}
                  onClick={() => handleChange(code)}
                >
                  <span className="flex items-center text-lg leading-none">
                    <img
                      src={`https://flagcdn.com/w40/${flagCode}.png`}
                      alt={code}
                      className="w-5 h-3  object-cover"
                    />
                  </span>
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const navLinks = [
  { name: "Home", href: "#home", active: true },
  { name: "Security & Compliance", href: "#security" },
  { name: "How It Works", href: "#HowItWorks" },
  { name: "Features", href: "#features" },
  { name: "Who It's For", href: "#who-its-for" },
];

const languages = [
  { code: "en", name: "English", flag: "/flags/us.svg" },
  { code: "es", name: "Español", flag: "/flags/es.svg" },
  { code: "fr", name: "Français", flag: "/flags/fr.svg" },
  { code: "de", name: "Deutsch", flag: "/flags/de.svg" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      setIsOpen(false);
    }
  };

  const handleUploadClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/compliance-check" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className=" flex items-center  px-3 py-2 content-fit  bg-gray-300 rounded-full backdrop-blur-md bg-opacity-60">
            <div className="hidden md:flex items-center  space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                  link.active
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          </div>

          {/* Right Side - Language and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src={selectedLanguage.flag}
                    alt={selectedLanguage.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-100 transition-colors ${
                        selectedLanguage.code === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Request Demo / Upload Button */}
            <button 
             onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors flex items-center"
            >
              sign in
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu button (only on mobile) */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    link.active
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={selectedLanguage.flag}
                      alt={selectedLanguage.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{selectedLanguage.name}</span>
                </div>
              </div>
              
              {/* Mobile Upload Button */}
              <button 
                onClick={handleUploadClick}
                className="mx-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GlobalLoader } from "../ui/global-loader";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const isTranslationExpected = () => {
      const googtrans = getCookie("googtrans");
      const selectedLanguage = localStorage.getItem("selectedLanguage");
      return googtrans && googtrans !== "/en/en" && selectedLanguage && selectedLanguage !== "en";
    };

    const hideInitialLoader = () => {
      const loader = document.getElementById("initial-loader");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
    };

    const finishLoading = () => {
      document.documentElement.classList.remove("translation-loading");
      hideInitialLoader();
      setIsLoading(false);
    };

    if (!isTranslationExpected()) {
      finishLoading();
    } else {
      setIsLoading(true);
      // Clear the translated classes to force a re-detection
      document.documentElement.classList.remove("translated-ltr", "translated-rtl");

      // Wait for Google Translate to add the translation class to the html tag
      const observer = new MutationObserver(() => {
        const html = document.documentElement;
        if (html.classList.contains("translated-ltr") || html.classList.contains("translated-rtl")) {
          // Add delay to ensure Google Translate's JavaScript execution is complete
          // before showing the content. This prevents the English flash.
          setTimeout(() => {
            finishLoading();
            observer.disconnect();
          }, 1000);
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Safety timeout to avoid stuck loading state
      const safetyTimeout = setTimeout(() => {
        finishLoading();
        observer.disconnect();
      }, 2000);

      // Try to re-trigger Google Translate for the new content
      if (window.google?.translate?.TranslateElement) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        } catch (e) {
          console.error("Re-trigger error:", e);
        }
      }

      return () => {
        observer.disconnect();
        clearTimeout(safetyTimeout);
      };
    }

    // Show loader when navigating or reloading for translation
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname]);

  useEffect(() => {
    // Function to check if a non-default language is active
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const googtrans = getCookie("googtrans");
    const selectedLanguage = localStorage.getItem("selectedLanguage");

    // If we have a translation cookie that is not English, and we just navigated
    if (googtrans && googtrans !== "/en/en" && selectedLanguage && selectedLanguage !== "en") {
      // Instead of window.location.reload(), we update the renderKey
      // and show the loader while Google Translate does its work.
      setRenderKey(prev => prev + 1);
      setIsLoading(true);
    }
  }, [pathname]);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        if (window.google) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,fr,iu,es,de,ar,pt,hi,bn,hu",
                layout:
                  window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              "google_translate_element",
            );
            setIsInitialized(true);
          } catch (error) {
            console.error("Translation initialization error:", error);
          }

          hideGoogleTranslateUI();
        }
      };
    };

    addGoogleTranslateScript();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const hideGoogleTranslateUI = () => {
    const hideInterval = setInterval(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) {
        (banner as HTMLElement).style.display = "none";
        (banner as HTMLElement).style.visibility = "hidden";
        (banner as HTMLElement).style.height = "0";
      }

      const topFrame = document.querySelector(".goog-te-top-frame");
      if (topFrame) {
        (topFrame as HTMLElement).style.display = "none";
        (topFrame as HTMLElement).style.visibility = "hidden";
        (topFrame as HTMLElement).style.height = "0";
      }

      const floatFrame = document.querySelector(".goog-te-float-frame");
      if (floatFrame) {
        (floatFrame as HTMLElement).style.display = "none";
        (floatFrame as HTMLElement).style.visibility = "hidden";
        (floatFrame as HTMLElement).style.height = "0";
      }

      const iframes = document.querySelectorAll("iframe[class*='goog']");
      iframes.forEach((iframe) => {
        (iframe as HTMLElement).style.display = "none";
        (iframe as HTMLElement).style.visibility = "hidden";
        (iframe as HTMLElement).style.height = "0";
      });

      const skipTranslate = document.querySelectorAll(".skiptranslate");
      skipTranslate.forEach((el) => {
        (el as HTMLElement).style.display = "none";
        (el as HTMLElement).style.visibility = "hidden";
        (el as HTMLElement).style.height = "0";
      });

      const vipgJd = document.querySelectorAll("[class*='VIpgJd']");
      vipgJd.forEach((el) => {
        (el as HTMLElement).style.display = "none";
        (el as HTMLElement).style.visibility = "hidden";
        (el as HTMLElement).style.height = "0";
      });
    }, 100);

    setTimeout(() => {
      clearInterval(hideInterval);
    }, 5000);
  };

  return (
    <>
      <GlobalLoader isVisible={isLoading} />
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <div key={renderKey} className="w-full h-full">
        {children}
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";

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
                includedLanguages: "en,fr,iu,es,de,ar,pt,hi,bn",
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
      <div id="google_translate_element" style={{ display: "none" }}></div>
      {children}
    </>
  );
}

import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ModalProvider } from "../components/provider/modal-provider";
import ReduxWrapper from "../redux/ReduxWrapper";

import GoogleTranslateProvider from "@/src/components/google-translation/GoogleLang";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medsyst",
  description: "Medical Assistant",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#0C0E14';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#ecebeb';
                  }

                  // Translation detection to prevent flash of English
                  var getCookie = function(name) {
                    var value = "; " + document.cookie;
                    var parts = value.split("; " + name + "=");
                    if (parts.length === 2) return parts.pop().split(";").shift();
                    return null;
                  };
                  var googtrans = getCookie("googtrans");
                  var selectedLanguage = localStorage.getItem("selectedLanguage");
                  if (googtrans && googtrans !== "/en/en" && selectedLanguage && selectedLanguage !== "en") {
                    document.documentElement.classList.add("translation-loading");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <style>
          {`
            #initial-loader {
              position: fixed;
              inset: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              z-index: 99999;
              background-color: var(--background, #ecebeb);
              transition: opacity 0.3s ease-out;
            }
            .dark #initial-loader {
              background-color: #0C0E14;
            }
            html.translation-loading #initial-loader {
              display: flex !important;
              opacity: 1 !important;
            }
            html.translation-loading body {
              overflow: hidden !important;
            }
            .loader-logo {
              width: 90px;
              height: 90px;
              animation: pulse-scale 2s ease-in-out infinite;
            }
            @keyframes pulse-scale {
              0%, 100% { 
                transform: scale(0.8); 
                opacity: 0.4;
              }
              50% { 
                transform: scale(1.1); 
                opacity: 1;
              }
            }
          `}
        </style>
      </head>
      <body
        className="antialiased relative! z-20 top-0! sora"
        style={{ position: "static", top: "0" }}
      >
        <div id="initial-loader">
          <img src="/logo-without-text.png" className="loader-logo" alt="Loading..." />
        </div>
        <GoogleTranslateProvider>
          <ReduxWrapper>
            {children} <ModalProvider />
          </ReduxWrapper>
          <Toaster position="top-right" richColors />
        </GoogleTranslateProvider>
      </body>
    </html>
  );
}

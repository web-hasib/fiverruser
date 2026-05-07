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
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased relative! z-20 top-0! sora"
        style={{ position: "static", top: "0" }}
      >
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

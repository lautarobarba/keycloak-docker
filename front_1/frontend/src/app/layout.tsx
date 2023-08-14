import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { NextUIProvider } from "@/providers/NextUIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Demo NextJS",
  description: "Demo NextJS",
  author: "Lautaro Barba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <NextUIProvider>
            <LanguageProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </LanguageProvider>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

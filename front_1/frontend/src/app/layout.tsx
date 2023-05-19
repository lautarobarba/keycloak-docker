import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Next App",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <>
          <h1>Next APP</h1>
          <main>{children}</main>
        </>
      </body>
    </html>
  );
}

export default RootLayout;

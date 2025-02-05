import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Twitter Clone App",
  description: "Twitter Clone App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async></script>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  ) 
}

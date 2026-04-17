import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RestaurantOS — Your kitchen's new operating system",
  description:
    "Every prep task. Every shift. Automated. A PWA + Telegram bot that replaces WhatsApp chaos with a single source of truth for kitchen prep.",
  openGraph: {
    title: "RestaurantOS",
    description: "Every prep task. Every shift. Automated.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={karla.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

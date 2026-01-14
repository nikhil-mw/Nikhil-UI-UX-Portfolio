import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const goga = localFont({
  src: [
    { path: './fonts/GogaTest-Hairline-BF6646d5d845dae.otf', weight: '100', style: 'normal' },
    { path: './fonts/GogaTest-Thin-BF6646d5d8040a9.otf', weight: '200', style: 'normal' },
    { path: './fonts/GogaTest-Extralight-BF6646d5d82fb83.otf', weight: '200', style: 'normal' },
    { path: './fonts/GogaTest-Light-BF6646d5d84c8a2.otf', weight: '300', style: 'normal' },
    { path: './fonts/GogaTest-Regular-BF6646d5d84f69b.otf', weight: '400', style: 'normal' },
    { path: './fonts/GogaTest-Medium-BF6646d5d84754e.otf', weight: '500', style: 'normal' },
    { path: './fonts/GogaTest-Semibold-BF6646d5d8544cf.otf', weight: '600', style: 'normal' },
    { path: './fonts/GogaTest-Bold-BF6646d5d83c978.otf', weight: '700', style: 'normal' },
    { path: './fonts/GogaTest-Extrabold-BF6646d5d7d0a2b.otf', weight: '800', style: 'normal' },
    { path: './fonts/GogaTest-Black-BF6646d5d78e551.otf', weight: '900', style: 'normal' },
  ],
  variable: "--font-goga",
});

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "High-end Scrollytelling Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${goga.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

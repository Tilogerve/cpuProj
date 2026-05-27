import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "On-CINE | 모두를 위한 영화 서비스",
  description: "온씨네에서 영화 예매와 주변 영화관 찾기를 한 번에 해결하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#121212]">
        <Header />
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 md:px-16 lg:px-24 pt-8 flex-1 self-center">
          {children}
        </div>
      </body>
    </html>
  );
}

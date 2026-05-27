import type { Metadata } from "next";
import Link from "next/link";
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
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-24 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              On-CINE
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/booking" className="text-sm sm:text-base font-bold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                영화 예매하기
              </Link>
              <Link href="/location" className="text-sm sm:text-base font-bold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                내 주변 찾기
              </Link>
              <Link href="/guestbook" className="text-sm sm:text-base font-bold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                방명록
              </Link>
            </nav>
          </div>
        </header>
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-24 pt-8 flex-1 self-center">
          {children}
        </div>
      </body>
    </html>
  );
}

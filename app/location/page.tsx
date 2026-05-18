"use client";

import React, { useState } from 'react';

export default function LocationPage() {
  const [previewData, setPreviewData] = useState<{ url: string; title: string } | null>(null);

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>, url: string, title: string) => {
    e.preventDefault();
    setPreviewData({ url, title });
  };

  return (
    <main className="w-full pb-24 pt-8 fade-in flex flex-col h-[calc(100vh-6rem)]">
      <section className="mb-8 shrink-0 flex flex-col items-center">
        <h1 className="a11y-heading mb-6 text-center text-gray-800 dark:text-gray-100">내 주변 영화관</h1>
        <button
          onClick={(e) => handlePreview(e, "https://on-cine-olive.vercel.app/", "내 위치 기준으로 영화관 찾기")}
          className="a11y-btn text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] w-full sm:w-auto px-12 py-5 text-center text-lg"
        >
          📍 내 위치 기준으로 영화관 찾기
        </button>
        <p className="text-center mt-4 text-sm text-gray-500">버튼을 누르면 아래 화면에 주변 영화관 지도가 나타납니다.</p>
      </section>

      {/* Fixed Inline Iframe Section */}
      <section className="flex-1 w-full bg-white dark:bg-[#1e1e1e] rounded-xl shadow-inner border-2 border-gray-100 dark:border-gray-800 overflow-hidden relative min-h-[500px]">
        {previewData ? (
          <div className="flex flex-col h-full w-full">
            <div className="bg-gray-100 dark:bg-black p-3 border-b border-gray-200 dark:border-gray-800 text-center font-bold text-gray-800 dark:text-gray-200 shadow-sm shrink-0 z-10">
              {previewData.title}
            </div>
            <iframe 
              src={previewData.url} 
              className="w-full flex-1 border-0"
              title={previewData.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-geolocation"
              allow="geolocation"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 flex-col gap-4">
            <svg xmlns="http://www.w3.org/.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-lg font-medium">위의 찾기 버튼을 선택해 주세요</p>
          </div>
        )}
      </section>
    </main>
  );
}

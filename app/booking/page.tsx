"use client";

import React, { useState } from 'react';

export default function BookingPage() {
  const [previewData, setPreviewData] = useState<{ url: string; title: string } | null>(null);

  const handlePreview = (e: React.MouseEvent<HTMLButtonElement>, url: string, title: string) => {
    e.preventDefault();
    setPreviewData({ url, title });
  };

  return (
    <main className="w-full pb-24 pt-8 fade-in flex flex-col h-[calc(100vh-6rem)]">
      <section className="mb-8 shrink-0">
        <h1 className="a11y-heading mb-6 text-center text-gray-800 dark:text-gray-100">영화 예매하기</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <button 
            onClick={(e) => handlePreview(e, "https://cgv.co.kr/cnm/movieBook/cinema", "CGV 극장별 예매 사이트")}
            className="a11y-btn text-white bg-[#ef4444] hover:bg-[#dc2626] shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] text-center h-full min-h-[70px] w-full transition-all"
          >
            CGV 예매하기
          </button>
          <button 
            onClick={(e) => handlePreview(e, "https://www.megabox.co.kr/booking", "메가박스 극장별 예매 사이트")}
            className="a11y-btn text-white bg-[#8b5cf6] hover:bg-[#7c3aed] shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] text-center h-full min-h-[70px] w-full transition-all"
          >
            메가박스 예매하기
          </button>
          <button 
            onClick={(e) => handlePreview(e, "https://www.lottecinema.co.kr/NLCHS/Ticketing", "롯데시네마 극장별 예매 사이트")}
            className="a11y-btn text-white bg-[#f97316] hover:bg-[#ea580c] shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] text-center h-full min-h-[70px] w-full transition-all"
          >
            롯데시네마 예매하기
          </button>
        </div>
        <p className="text-center mt-4 text-sm text-gray-500">버튼을 누르면 아래 화면에 예매 사이트가 나타납니다.</p>
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
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 flex-col gap-4">
            <svg xmlns="http://www.w3.org/.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-lg font-medium">위의 예매 버튼을 선택해 주세요</p>
          </div>
        )}
      </section>
    </main>
  );
}

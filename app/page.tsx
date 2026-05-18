import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full pb-24 pt-20 fade-in flex flex-col items-center justify-center min-h-[70vh]">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-500 dark:text-gray-400 mb-4">모두를 위한 영화 서비스</h2>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-12">
          On-CINE
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 px-4">
          온씨네에서 빠르고 간편하게 원하시는 영화관을 예매하고, 내 위치를 기반으로 가장 가까운 영화관을 찾아보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
          <Link
            href="/booking"
            className="a11y-btn text-white bg-blue-600 hover:bg-blue-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] w-full sm:w-auto px-12 py-6 text-xl"
          >
            🍿 영화 예매하기
          </Link>
          <Link
            href="/location"
            className="a11y-btn text-gray-900 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:bg-[#1e1e1e] dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 shadow-sm w-full sm:w-auto px-12 py-6 text-xl"
          >
            📍 내 주변 찾기
          </Link>
        </div>
      </section>
    </main>
  );
}

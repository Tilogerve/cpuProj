"use client";

import React, { useState, useEffect } from "react";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  rating: number;
  badge: "CGV" | "MegaBox" | "Lotte" | "None";
  date: string;
  likes: number;
}

const DEFAULT_POSTS: GuestbookEntry[] = [
  {
    id: "1",
    name: "영화덕후",
    message: "온씨네 덕분에 집 주변 영화관을 한눈에 볼 수 있어서 너무 편리해요! 🍿",
    emoji: "🍿",
    rating: 5,
    badge: "None",
    date: "2026-05-25",
    likes: 8,
  },
  {
    id: "2",
    name: "CGV매니아",
    message: "CGV 예매 바로가기 너무 직관적이고 편하네요. 자주 이용하겠습니다! 영화 예매 완전 편해요.",
    emoji: "🎬",
    rating: 4,
    badge: "CGV",
    date: "2026-05-24",
    likes: 12,
  },
  {
    id: "3",
    name: "메박조아",
    message: "주말 영화 예매할 때 메가박스 사이트 바로 연동되어 대박 유용한 서비스인 것 같아요!!",
    emoji: "🍿",
    rating: 5,
    badge: "MegaBox",
    date: "2026-05-23",
    likes: 5,
  },
  {
    id: "4",
    name: "롯시러버",
    message: "내 위치 기준으로 영화관 위치를 바로 찾을 수 있어서 시간 절약이 많이 됩니다! 추천합니다. 📍",
    emoji: "🎥",
    rating: 5,
    badge: "Lotte",
    date: "2026-05-22",
    likes: 15,
  }
];

export default function GuestbookPage() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  // Form states
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("🍿");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [badge, setBadge] = useState<"CGV" | "MegaBox" | "Lotte" | "None">("None");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("oncine-guestbook");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(DEFAULT_POSTS);
      }
    } else {
      setEntries(DEFAULT_POSTS);
      localStorage.setItem("oncine-guestbook", JSON.stringify(DEFAULT_POSTS));
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever entries change
  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("oncine-guestbook", JSON.stringify(newEntries));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    if (name.length > 10 || message.length > 200) return;

    setIsSubmitting(true);

    // Simulate light submission delay for premium feel
    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        emoji,
        rating,
        badge,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
      };

      const updated = [newEntry, ...entries];
      saveEntries(updated);

      // Reset form
      setName("");
      setMessage("");
      setEmoji("🍿");
      setRating(5);
      setBadge("None");
      setIsSubmitting(false);

      // Show toast
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 450);
  };

  const handleLike = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, likes: entry.likes + 1 };
      }
      return entry;
    });
    saveEntries(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("이 방명록 글을 삭제하시겠습니까?")) {
      const updated = entries.filter((entry) => entry.id !== id);
      saveEntries(updated);
    }
  };

  // Filter and Search logic
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const emojis = ["🍿", "🎬", "🎟️", "🥤", "🎥", "⭐", "❤️", "🤩"];

  const getBadgeStyle = (badgeType: "CGV" | "MegaBox" | "Lotte" | "None") => {
    switch (badgeType) {
      case "CGV":
        return "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60";
      case "MegaBox":
        return "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/60";
      case "Lotte":
        return "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/60";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-800";
    }
  };

  const getCardBorderStyle = (badgeType: "CGV" | "MegaBox" | "Lotte" | "None") => {
    switch (badgeType) {
      case "CGV":
        return "border-l-4 border-l-red-500 focus-within:ring-red-200 dark:focus-within:ring-red-900/30";
      case "MegaBox":
        return "border-l-4 border-l-purple-500 focus-within:ring-purple-200 dark:focus-within:ring-purple-900/30";
      case "Lotte":
        return "border-l-4 border-l-orange-500 focus-within:ring-orange-200 dark:focus-within:ring-orange-900/30";
      default:
        return "border-l-4 border-l-gray-300 dark:border-l-gray-700 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/20";
    }
  };

  if (!mounted) {
    return (
      <main className="w-full pb-24 pt-8 fade-in min-h-[70vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-250 border-t-blue-600"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">방명록을 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full pb-16 sm:pb-24 pt-2 fade-in">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center bg-gray-950 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-2xl transition-all transform animate-bounce">
          <span className="text-lg mr-2">✨</span>
          <span className="font-semibold text-sm">방명록 작성이 완료되었습니다!</span>
        </div>
      )}

      {/* Hero section */}
      <section className="mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-gray-150 dark:border-gray-800/80 shrink-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 sm:mb-3">
          영화 방명록 🍿
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
          온씨네 서비스에 대해 의견을 남기거나 주변 영화관에서의 즐거운 경험을 공유해주세요.
        </p>
      </section>

      {/* Grid Layout: Forms on left (or top on small screens), Feed on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Side: Writing Form */}
        <section className="lg:col-span-5 lg:sticky lg:top-24 bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-100/40 dark:shadow-none transition-all">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
            ✍️ 방문 후기 남기기
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            {/* Author name input */}
            <div>
              <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                작성자 닉네임
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={10}
                required
                placeholder="닉네임 (10자 이내)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all font-medium text-sm"
              />
            </div>

            {/* Favorite Cinema Badge */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                최애 영화관 뱃지
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["None", "CGV", "MegaBox", "Lotte"] as const).map((b) => {
                  const isActive = badge === b;
                  let activeClass = "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm";
                  if (isActive) {
                    if (b === "CGV") activeClass = "bg-red-500 border-red-500 text-white shadow-sm";
                    if (b === "MegaBox") activeClass = "bg-purple-600 border-purple-600 text-white shadow-sm";
                    if (b === "Lotte") activeClass = "bg-orange-500 border-orange-500 text-white shadow-sm";
                  }
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBadge(b)}
                      className={`py-2 px-1 text-xs sm:text-sm font-bold border rounded-lg transition-all ${isActive
                        ? activeClass
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      {b === "None" ? "없음" : b === "Lotte" ? "롯데시네마" : b === "MegaBox" ? "메가박스" : b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Emoji Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                현재 감정 / 아이콘
              </label>
              <div className="flex flex-wrap gap-2">
                {emojis.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setEmoji(em)}
                    className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border transition-all ${emoji === em
                      ? "bg-blue-50 dark:bg-blue-900/40 border-blue-500 transform scale-110 shadow-md"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Star Rating selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">
                별점 평가
              </label>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transform hover:scale-125 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-7 w-7 sm:h-8 sm:w-8 ${star <= (hoverRating ?? rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 dark:text-gray-600"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.773-.56-.375-1.81.587-1.81H8.48a1 1 0 00.95-.69L11.05 2.92z"
                      />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 font-bold text-sm text-gray-600 dark:text-gray-400">({rating}점)</span>
              </div>
            </div>

            {/* Message input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message-input" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  소중한 후기
                </label>
                <span className="text-[10px] font-medium text-gray-400">{message.length}/200자</span>
              </div>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                required
                rows={4}
                placeholder="온씨네 서비스에 대해 의견을 남기거나 주변 영화관에서의 즐거운 경험을 공유해주세요!"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className={`a11y-btn text-white font-bold py-4 rounded-xl shadow-lg transition-all w-full ${isSubmitting || !name.trim() || !message.trim()
                ? "bg-gray-200 dark:bg-gray-800/60 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                : "bg-blue-600 hover:bg-blue-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>방명록 올리는 중...</span>
                </div>
              ) : (
                "✨ 방명록 등록하기"
              )}
            </button>
          </form>

          {/* Form Real-time Preview */}
          <div className="mt-8 border-t border-gray-150 dark:border-gray-800/80 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              실시간 미리보기
            </h3>
            <div className={`p-5 rounded-xl bg-gray-50/50 dark:bg-gray-800/10 border border-dashed border-gray-300 dark:border-gray-700 shadow-sm transition-all ${getCardBorderStyle(badge)}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                      {name.trim() || "작성자"}
                    </span>
                    <div className="text-xs text-gray-400">오늘</div>
                  </div>
                </div>
                {badge !== "None" && (
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${getBadgeStyle(badge)}`}>
                    {badge === "Lotte" ? "롯데시네마" : badge === "MegaBox" ? "메가박스" : badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={`h-4 w-4 ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-700"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm break-words whitespace-pre-wrap leading-relaxed">
                {message.trim() || "여기에 작성하시는 내용이 실시간으로 미리보기로 보여집니다."}
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Feed List */}
        <section className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 w-full">
          {/* Controls: Search */}
          <div className="bg-white dark:bg-[#1a1a1a] p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="작성자 혹은 방명록 내용 검색..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-sm"
              />
              <svg
                className="absolute left-4 top-3.5 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Guestbook List Grid */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <article
                  key={entry.id}
                  className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-150 dark:border-gray-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative group ${getCardBorderStyle(
                    entry.badge
                  )}`}
                >
                  {/* Top line info */}
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl bg-gray-50 dark:bg-gray-800/80 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm shrink-0">
                        {entry.emoji}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base">
                          {entry.name}
                        </h4>
                        <time className="text-xs text-gray-400 block mt-0.5">{entry.date}</time>
                      </div>
                    </div>

                    {/* Badge right side */}
                    <div className="flex items-center gap-2">
                      {entry.badge !== "None" && (
                        <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full border ${getBadgeStyle(entry.badge)}`}>
                          {entry.badge === "Lotte" ? "롯데시네마" : entry.badge === "MegaBox" ? "메가박스" : entry.badge}
                        </span>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all ml-1 cursor-pointer"
                        aria-label="방명록 삭제"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Rating display */}
                  <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`h-4 w-4 ${s <= entry.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-700"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Message body */}
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base break-words whitespace-pre-wrap leading-relaxed mb-3 sm:mb-4">
                    {entry.message}
                  </p>

                  {/* Action bottom line */}
                  <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800/80 pt-3">
                    <button
                      onClick={() => handleLike(entry.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors group/like bg-gray-50 dark:bg-gray-800/50 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 rounded-full cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 group-hover/like:text-red-500 group-active/like:scale-125 transition-all fill-transparent group-hover/like:fill-red-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>추천 {entry.likes}</span>
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8 sm:p-12 rounded-xl sm:rounded-2xl text-center shadow-md">
                <div className="text-5xl mb-4">🎬</div>
                <h4 className="font-extrabold text-gray-800 dark:text-white text-lg mb-2">
                  검색된 방명록이 없습니다.
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                  첫 방명록의 주인공이 되거나, 다른 검색어로 변경해보세요!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

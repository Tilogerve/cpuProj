"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/booking", label: "영화 예매하기", icon: "🍿" },
    { href: "/location", label: "내 주변 찾기", icon: "📍" },
    { href: "/guestbook", label: "방명록", icon: "✍️" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          On-CINE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm lg:text-base font-bold transition-colors ${
                isActive(link.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <nav
          className={`relative bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 py-4 px-4 rounded-xl text-base font-bold transition-all ${
                  isActive(link.href)
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

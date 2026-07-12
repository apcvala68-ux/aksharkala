"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Sarees", href: "/collections" },
  { label: "Indo-Western", href: "/collections" },
  { label: "Heritage", href: "/heritage" },
  { label: "Craftsmanship", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2, 4);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1200px] z-50 bg-[#1a150d]/95 backdrop-blur-lg border border-secondary/25 text-on-surface shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition duration-300 ${mobileOpen ? "rounded-2xl" : "rounded-full"}`}>
      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center px-12 h-16">
        {/* Left Links */}
        <ul className="flex items-center gap-8 w-1/3 justify-start">
          {leftLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-[11px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1 block group"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Center Brand Logo */}
        <div className="flex justify-center w-1/3">
          <Link href="/" className="block">
            <Image
              src="/aksharkala-logo.png"
              alt="Aksharkala"
              width={120}
              height={40}
              className="h-10 w-auto brightness-[1.5] contrast-[1.15]"
              priority
            />
          </Link>
        </div>

        {/* Right Links */}
        <ul className="flex items-center gap-8 w-1/3 justify-end">
          {rightLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-[11px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-secondary transition-colors duration-300 py-1 block group"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center px-6 h-14">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          className="text-on-surface hover:text-secondary transition-colors flex items-center"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>

        <Link href="/" className="block">
          <Image
            src="/aksharkala-logo.png"
            alt="Aksharkala"
            width={80}
            height={30}
            className="h-8 w-auto brightness-[1.5] contrast-[1.15]"
          />
        </Link>

        {/* Empty placeholder to keep title centered */}
        <div className="w-[24px]"></div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-secondary/15 px-6 py-5 rounded-b-2xl bg-surface/95 backdrop-blur-md">
          <ul className="flex flex-col gap-4">
            {navLinks
              .filter((link) => link.label !== "Sarees" && link.label !== "Indo-Western" && link.label !== "Craftsmanship")
              .map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="relative text-[12px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant active:text-secondary transition-colors duration-300 block py-1 group"
                    style={{ fontFamily: "var(--font-inter)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full group-active:w-full"></span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

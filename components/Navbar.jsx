'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listed Books', href: '/listed-books' },
    { name: 'Pages to Read', href: '/pages-to-read' },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full pb-6 sm:pb-8">
      <nav className="flex items-center justify-between py-2">
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131313] hover:opacity-90">
          Book Vibe
        </Link>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-base sm:text-lg transition font-medium ${
                  active
                    ? 'border border-[#23BE0A] text-[#23BE0A] font-semibold'
                    : 'text-[#131313]/80 hover:text-[#23BE0A]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            className="bg-[#23BE0A] hover:bg-[#1fa909] text-white font-semibold text-base px-6 py-3 rounded-lg transition shadow-sm active:scale-95 cursor-pointer"
          >
            Sign In
          </button>
          <button
            type="button"
            className="bg-[#59C6D2] hover:bg-[#4cb5c1] text-white font-semibold text-base px-6 py-3 rounded-lg transition shadow-sm active:scale-95 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-base transition ${
                    active
                      ? 'border border-[#23BE0A] text-[#23BE0A] font-semibold bg-white'
                      : 'text-[#131313]/80 hover:text-[#23BE0A]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col sm:hidden gap-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              className="w-full bg-[#23BE0A] text-white font-semibold py-2.5 rounded-lg text-center"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full bg-[#59C6D2] text-white font-semibold py-2.5 rounded-lg text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import { useBooks } from '@/context/BookContext';
import booksData from '@/data/booksData.json';
import PagesChart from '@/components/PagesChart';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function PagesToReadPage() {
  const { readList } = useBooks();
  // By default, show all books from booksData.json matching Figma mockup, or allow toggling to Read List
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'read'

  const booksToDisplay = viewMode === 'read' ? readList : booksData;

  const totalPages = booksToDisplay.reduce((acc, b) => acc + (b.totalPages || 0), 0);
  const averagePages = booksToDisplay.length > 0 ? Math.round(totalPages / booksToDisplay.length) : 0;

  return (
    <div className="w-full pb-16">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#131313]">
            Pages to Read
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Visual breakdown of page volume across books
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 bg-[#F3F3F3] p-1.5 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              viewMode === 'all'
                ? 'bg-white text-[#131313] shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            All Catalog ({booksData.length})
          </button>
          <button
            type="button"
            onClick={() => setViewMode('read')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              viewMode === 'read'
                ? 'bg-white text-[#131313] shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            My Read Books ({readList.length})
          </button>
        </div>
      </div>

      {/* Metric summary badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F3F3F3] rounded-2xl p-4 sm:p-5">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Total Books</span>
          <p className="text-xl sm:text-2xl font-bold text-[#131313] mt-1">{booksToDisplay.length}</p>
        </div>
        <div className="bg-[#F3F3F3] rounded-2xl p-4 sm:p-5">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Total Pages</span>
          <p className="text-xl sm:text-2xl font-bold text-[#23BE0A] mt-1">{totalPages.toLocaleString()}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-[#F3F3F3] rounded-2xl p-4 sm:p-5">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Avg Pages / Book</span>
          <p className="text-xl sm:text-2xl font-bold text-[#59C6D2] mt-1">{averagePages}</p>
        </div>
      </div>

      {/* Chart Display or Empty State */}
      {booksToDisplay.length > 0 ? (
        <PagesChart books={booksToDisplay} />
      ) : (
        <div className="bg-[#F3F3F3] rounded-3xl p-12 text-center flex flex-col items-center justify-center my-6">
          <BookOpen className="w-16 h-16 text-gray-400 mb-4 stroke-1" />
          <h3 className="font-serif text-2xl font-bold text-[#131313] mb-2">
            No books in your Read list yet
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            Mark books as &ldquo;Read&rdquo; from the book details page to see their page counts visualized here, or switch to the Catalog view.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold px-5 py-2.5 rounded-lg transition"
            >
              View Catalog
            </button>
            <Link
              href="/"
              className="bg-[#23BE0A] hover:bg-[#1ea909] text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Browse Books
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

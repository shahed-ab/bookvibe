'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, BookOpen } from 'lucide-react';
import { useBooks } from '@/context/BookContext';
import BookListRow from '@/components/BookListRow';

export default function ListedBooksPage() {
  const { readList, wishlist } = useBooks();
  const [activeTab, setActiveTab] = useState('read'); // 'read' or 'wishlist'
  const [sortBy, setSortBy] = useState('default');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeBooks = activeTab === 'read' ? readList : wishlist;

  const sortedBooks = useMemo(() => {
    const list = [...activeBooks];
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'pages') {
      return list.sort((a, b) => b.totalPages - a.totalPages);
    }
    if (sortBy === 'year') {
      return list.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
    }
    return list;
  }, [activeBooks, sortBy]);

  const handleSortSelect = (criterion) => {
    setSortBy(criterion);
    setDropdownOpen(false);
  };

  const getSortLabel = () => {
    if (sortBy === 'rating') return 'Rating';
    if (sortBy === 'pages') return 'Number of pages';
    if (sortBy === 'year') return 'Publisher year';
    return 'Sort By';
  };

  return (
    <div className="w-full pb-16">
      {/* Header Banner */}
      <div className="bg-[#F3F3F3] rounded-2xl py-8 mb-8 text-center">
        <h1 className="text-3xl font-bold font-serif text-[#131313]">
          Books
        </h1>
      </div>

      {/* Sort By Dropdown */}
      <div className="relative flex justify-center mb-10">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="bg-[#23BE0A] hover:bg-[#1ea909] text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 transition active:scale-95 shadow-sm cursor-pointer"
        >
          <span>{getSortLabel()}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute top-14 z-20 w-56 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              type="button"
              onClick={() => handleSortSelect('rating')}
              className={`w-full text-left px-4 py-2.5 text-sm sm:text-base font-medium transition hover:bg-[#23BE0A]/10 hover:text-[#23BE0A] ${
                sortBy === 'rating' ? 'text-[#23BE0A] font-semibold bg-gray-50' : 'text-gray-700'
              }`}
            >
              Rating (High to Low)
            </button>
            <button
              type="button"
              onClick={() => handleSortSelect('pages')}
              className={`w-full text-left px-4 py-2.5 text-sm sm:text-base font-medium transition hover:bg-[#23BE0A]/10 hover:text-[#23BE0A] ${
                sortBy === 'pages' ? 'text-[#23BE0A] font-semibold bg-gray-50' : 'text-gray-700'
              }`}
            >
              Number of pages
            </button>
            <button
              type="button"
              onClick={() => handleSortSelect('year')}
              className={`w-full text-left px-4 py-2.5 text-sm sm:text-base font-medium transition hover:bg-[#23BE0A]/10 hover:text-[#23BE0A] ${
                sortBy === 'year' ? 'text-[#23BE0A] font-semibold bg-gray-50' : 'text-gray-700'
              }`}
            >
              Publisher year
            </button>
            {sortBy !== 'default' && (
              <button
                type="button"
                onClick={() => handleSortSelect('default')}
                className="w-full text-left px-4 py-2 text-xs text-gray-500 hover:text-red-500 border-t border-gray-100 mt-1"
              >
                Reset sorting
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('read')}
          className={`px-5 py-3 text-base sm:text-lg transition font-medium cursor-pointer ${
            activeTab === 'read'
              ? 'border-t border-x border-gray-300 rounded-t-xl bg-white text-[#131313] font-semibold -mb-[1px]'
              : 'text-[#131313]/60 hover:text-[#131313]'
          }`}
        >
          Read Books ({readList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-3 text-base sm:text-lg transition font-medium cursor-pointer ${
            activeTab === 'wishlist'
              ? 'border-t border-x border-gray-300 rounded-t-xl bg-white text-[#131313] font-semibold -mb-[1px]'
              : 'text-[#131313]/60 hover:text-[#131313]'
          }`}
        >
          Wishlist Books ({wishlist.length})
        </button>
      </div>

      {/* Book List Rows or Empty State */}
      {sortedBooks.length > 0 ? (
        <div className="flex flex-col">
          {sortedBooks.map((book) => (
            <BookListRow key={book.bookId} book={book} />
          ))}
        </div>
      ) : (
        <div className="bg-[#F3F3F3] rounded-2xl p-12 text-center flex flex-col items-center justify-center my-6">
          <BookOpen className="w-16 h-16 text-gray-400 mb-4 stroke-1" />
          <h3 className="font-serif text-2xl font-bold text-[#131313] mb-2">
            No books in your {activeTab === 'read' ? 'Read list' : 'Wishlist'} yet
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            Explore our curated catalog and mark books as &ldquo;Read&rdquo; or save them to your &ldquo;Wishlist&rdquo; to track them here.
          </p>
          <Link
            href="/"
            className="bg-[#23BE0A] hover:bg-[#1ea909] text-white font-semibold px-6 py-3 rounded-lg transition active:scale-95 shadow-sm"
          >
            Explore Books
          </Link>
        </div>
      )}
    </div>
  );
}

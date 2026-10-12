'use client';

import React from 'react';
import { useBooks } from '@/context/BookContext';

export default function BookActionButtons({ book }) {
  const { addToRead, addToWishlist, readList, wishlist } = useBooks();

  const isRead = readList.some((b) => b.bookId === book.bookId);
  const isWishlisted = wishlist.some((b) => b.bookId === book.bookId);

  return (
    <div className="flex flex-wrap items-center gap-4 pt-6 sm:pt-8">
      <button
        type="button"
        onClick={() => addToRead(book)}
        className={`px-7 py-3.5 rounded-lg font-semibold text-base sm:text-lg border transition shadow-sm active:scale-95 cursor-pointer ${
          isRead
            ? 'border-[#23BE0A] bg-[#23BE0A]/10 text-[#23BE0A]'
            : 'border-[#131313]/30 text-[#131313] hover:bg-gray-100 hover:border-black'
        }`}
      >
        {isRead ? 'Read ✓' : 'Read'}
      </button>

      <button
        type="button"
        onClick={() => addToWishlist(book)}
        className={`px-7 py-3.5 rounded-lg font-semibold text-base sm:text-lg text-white transition shadow-sm active:scale-95 cursor-pointer ${
          isWishlisted
            ? 'bg-[#3b93a7]'
            : 'bg-[#50B1C9] hover:bg-[#429cb0]'
        }`}
      >
        {isWishlisted ? 'Wishlisted ✓' : 'Wishlist'}
      </button>
    </div>
  );
}

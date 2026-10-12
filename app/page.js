import React from 'react';
import Banner from '@/components/Banner';
import BookCard from '@/components/BookCard';
import booksData from '@/data/booksData.json';

export default function HomePage() {
  return (
    <div className="w-full pb-12 sm:pb-20">
      {/* Hero Banner */}
      <Banner />

      {/* Books Section */}
      <section className="mt-14 sm:mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold font-serif text-center text-[#131313] mb-9 sm:mb-12">
          Books
        </h2>

        {/* 3-Column Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksData.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

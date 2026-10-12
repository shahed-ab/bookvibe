import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import booksData from '@/data/booksData.json';
import BookActionButtons from '@/components/BookActionButtons';

export async function generateStaticParams() {
  return booksData.map((book) => ({
    id: book.bookId.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = booksData.find((b) => b.bookId === parseInt(id, 10));
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.bookName} — Book Vibe`,
    description: book.review.slice(0, 160),
  };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = booksData.find((b) => b.bookId === parseInt(id, 10));

  if (!book) {
    notFound();
  }

  const {
    bookName,
    author,
    image,
    review,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = book;

  return (
    <div className="w-full py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Left Column: Book Cover in Light Gray Box */}
        <div className="bg-[#F3F3F3] rounded-2xl sm:rounded-3xl p-8 sm:p-14 lg:p-20 flex items-center justify-center min-h-[400px] sm:min-h-[520px] lg:min-h-[640px]">
          <div className="relative w-full max-w-[340px] aspect-[2/3] flex items-center justify-center">
            <Image
              src={image}
              alt={bookName}
              width={340}
              height={500}
              priority
              className="max-h-[480px] w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column: Book Details */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold font-serif text-[#131313] leading-tight mb-3">
            {bookName}
          </h1>

          {/* Author */}
          <p className="text-lg sm:text-xl font-medium text-[#131313]/80 mb-4">
            By : {author}
          </p>

          <hr className="border-t border-[#131313]/15 my-2" />

          {/* Category */}
          <p className="text-lg sm:text-xl font-medium text-[#131313]/80 my-2">
            {category}
          </p>

          <hr className="border-t border-[#131313]/15 my-2" />

          {/* Review Paragraph */}
          <p className="text-base sm:text-lg text-[#131313]/70 leading-relaxed my-3">
            <strong className="text-[#131313] font-bold">Review : </strong>
            {review}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 my-4">
            <span className="text-[#131313] font-bold text-base sm:text-lg mr-2">
              Tag
            </span>
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-[#23BE0A]/5 text-[#23BE0A] font-semibold text-sm sm:text-base px-4 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <hr className="border-t border-[#131313]/15 my-3" />

          {/* Metadata Grid */}
          <div className="flex flex-col gap-3 my-2 max-w-md">
            <div className="flex items-center text-base sm:text-lg">
              <span className="w-48 text-[#131313]/70">Number of Pages:</span>
              <span className="font-bold text-[#131313]">{totalPages}</span>
            </div>
            <div className="flex items-center text-base sm:text-lg">
              <span className="w-48 text-[#131313]/70">Publisher:</span>
              <span className="font-bold text-[#131313]">{publisher}</span>
            </div>
            <div className="flex items-center text-base sm:text-lg">
              <span className="w-48 text-[#131313]/70">Year of Publishing:</span>
              <span className="font-bold text-[#131313]">{yearOfPublishing}</span>
            </div>
            <div className="flex items-center text-base sm:text-lg">
              <span className="w-48 text-[#131313]/70">Rating:</span>
              <span className="font-bold text-[#131313]">{rating}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <BookActionButtons book={book} />
        </div>
      </div>
    </div>
  );
}

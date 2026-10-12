import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, FileText } from 'lucide-react';

export default function BookListRow({ book }) {
  const {
    bookId,
    bookName,
    author,
    image,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = book;

  return (
    <div className="border border-[#131313]/15 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 hover:shadow-md hover:border-[#23BE0A]/30 transition bg-white w-full">
      {/* Thumbnail in Light Gray Box */}
      <div className="bg-[#F3F3F3] rounded-2xl p-6 flex items-center justify-center w-full md:w-56 h-56 flex-shrink-0">
        <Image
          src={image}
          alt={bookName}
          width={130}
          height={170}
          className="max-h-44 w-auto object-contain drop-shadow"
        />
      </div>

      {/* Book Metadata & Actions */}
      <div className="flex-1 w-full flex flex-col justify-between h-full">
        <div>
          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-[#131313] mb-1.5">
            {bookName}
          </h3>

          {/* Author */}
          <p className="text-base font-medium text-[#131313]/80 mb-4">
            By : {author}
          </p>

          {/* Tags and Year */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
            <span className="font-bold text-[#131313] text-sm sm:text-base">
              Tag
            </span>
            {tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#23BE0A]/5 text-[#23BE0A] font-semibold text-xs sm:text-sm px-3.5 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            <div className="flex items-center gap-1.5 text-sm sm:text-base text-[#131313]/70">
              <MapPin className="w-4 h-4 text-[#131313]/60 stroke-[1.5]" />
              <span>Year of Publishing: {yearOfPublishing}</span>
            </div>
          </div>

          {/* Publisher and Pages */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-[#131313]/70 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#131313]/60 stroke-[1.5]" />
              <span>Publisher: {publisher}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#131313]/60 stroke-[1.5]" />
              <span>Page {totalPages}</span>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#131313]/15 my-3" />

        {/* Badges and View Details Button */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-[#328EFF]/15 text-[#328EFF] rounded-full px-4 py-2 text-sm font-medium">
            Category: {category}
          </span>
          <span className="bg-[#FFAC33]/15 text-[#FFAC33] rounded-full px-4 py-2 text-sm font-medium">
            Rating: {rating}
          </span>
          <Link
            href={`/books/${bookId}`}
            className="bg-[#23BE0A] hover:bg-[#1ea909] text-white rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 shadow-sm inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

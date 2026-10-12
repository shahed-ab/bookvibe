import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function BookCard({ book }) {
  const { bookId, bookName, author, image, rating, category, tags } = book;

  return (
    <Link
      href={`/books/${bookId}`}
      className="border border-[#131313]/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#23BE0A]/40 transition-all duration-300 group cursor-pointer bg-white"
    >
      <div>
        <div className="bg-[#F3F3F3] rounded-2xl py-8 px-4 flex items-center justify-center mb-6 h-64 relative overflow-hidden">
          <Image
            src={image}
            alt={bookName}
            width={134}
            height={166}
            className="h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#23BE0A]/5 text-[#23BE0A] font-medium text-sm sm:text-base px-4 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold text-[#131313] mb-2 line-clamp-1 group-hover:text-[#23BE0A] transition-colors">
          {bookName}
        </h3>

        {/* Author */}
        <p className="text-base font-medium text-[#131313]/80 mb-5">
          By : {author}
        </p>
      </div>

      {/* Footer / Meta Divider */}
      <div className="border-t border-dashed border-[#131313]/15 pt-4 mt-auto flex items-center justify-between text-[#131313]/80 text-base font-medium">
        <span>{category}</span>
        <div className="flex items-center gap-2">
          <span>{Number(rating).toFixed(1)}</span>
          <Star className="w-5 h-5 text-gray-400 stroke-[1.5]" />
        </div>
      </div>
    </Link>
  );
}

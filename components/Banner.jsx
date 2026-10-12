import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
  return (
    <section className="w-full bg-[#F3F3F3] rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-20 flex flex-col-reverse md:flex-row items-center justify-between gap-8 lg:gap-12">
      <div className="flex flex-col items-start max-w-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-bold font-serif text-[#131313] leading-tight lg:leading-[1.2] mb-8 sm:mb-12">
          Books to freshen up your bookshelf
        </h1>
        <Link
          href="/listed-books"
          className="bg-[#23BE0A] hover:bg-[#1ea909] text-white font-bold text-lg sm:text-xl px-7 py-4 rounded-lg transition shadow-md active:scale-95 inline-block"
        >
          View The List
        </Link>
      </div>

      <div className="flex items-center justify-center relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5]">
        <Image
          src="/images/hero_img.jpg"
          alt="Featured Book - The Dating Playbook for Men"
          width={318}
          height={394}
          priority
          className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
}

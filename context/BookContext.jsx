'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [readList, setReadList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      const savedRead = localStorage.getItem('book_vibe_read');
      const savedWish = localStorage.getItem('book_vibe_wishlist');
      if (savedRead) setReadList(JSON.parse(savedRead));
      if (savedWish) setWishlist(JSON.parse(savedWish));
    } catch (e) {
      console.error('Failed to load books from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('book_vibe_read', JSON.stringify(readList));
    } catch (e) {
      console.error('Failed to save read list', e);
    }
  }, [readList, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('book_vibe_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist, isLoaded]);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 3000);
  };

  const addToRead = (book) => {
    const existsInRead = readList.some((b) => b.bookId === book.bookId);
    if (existsInRead) {
      showToast(`"${book.bookName}" is already in your Read list!`, 'warning');
      return { success: false, message: 'Already in read list' };
    }

    setReadList((prev) => [...prev, book]);
    setWishlist((prev) => prev.filter((b) => b.bookId !== book.bookId));
    showToast(`"${book.bookName}" added to Read list!`, 'success');
    return { success: true };
  };

  const addToWishlist = (book) => {
    const existsInRead = readList.some((b) => b.bookId === book.bookId);
    if (existsInRead) {
      showToast(`You have already read "${book.bookName}"!`, 'warning');
      return { success: false, message: 'Already marked as read' };
    }

    const existsInWish = wishlist.some((b) => b.bookId === book.bookId);
    if (existsInWish) {
      showToast(`"${book.bookName}" is already in your Wishlist!`, 'warning');
      return { success: false, message: 'Already in wishlist' };
    }

    setWishlist((prev) => [...prev, book]);
    showToast(`"${book.bookName}" added to Wishlist!`, 'success');
    return { success: true };
  };

  const removeFromRead = (bookId) => {
    setReadList((prev) => prev.filter((b) => b.bookId !== bookId));
    showToast('Removed from Read list', 'info');
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((b) => b.bookId !== bookId));
    showToast('Removed from Wishlist', 'info');
  };

  return (
    <BookContext.Provider
      value={{
        readList,
        wishlist,
        addToRead,
        addToWishlist,
        removeFromRead,
        removeFromWishlist,
      }}
    >
      {children}

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all">
          <div
            className={`px-5 py-3 rounded-xl shadow-xl text-white font-medium flex items-center gap-2 ${
              notification.type === 'success'
                ? 'bg-[#23BE0A]'
                : notification.type === 'warning'
                ? 'bg-[#E7A500]'
                : 'bg-[#59C6D2]'
            }`}
          >
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}

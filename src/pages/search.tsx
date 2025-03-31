import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';
import SearchResults from '@/components/SearchResults';
import Link from 'next/link';

export default function MapComponent() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="relative bg-gray-100 p-4">
        <div className="flex justify-center mt-6 mb-4">
          <Link
            href="/"
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-r-none shadow-md transition group border-2 border-blue-700 border-r-0 ${router.pathname === "/" ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className={`absolute inset-0 ${router.pathname === "/" ? 'bg-sky-600' : 'bg-sky-100'} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></span>
            <span className="relative z-10">地図を表示</span>
          </Link>
          <Link
            href="/search"
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-l-none shadow-md transition group border-2 border-blue-700 border-l-0 ${router.pathname === "/search" ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className={`absolute inset-0 ${router.pathname === "/search" ? 'bg-sky-100' : 'bg-sky-600'} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></span>
            <span className="relative z-10">検索結果を表示</span>
          </Link>
        </div>

        <SearchResults />
      </div>
    </AppLayout>
  );
}

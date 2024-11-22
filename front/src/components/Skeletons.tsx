'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SectionSkeleton = () => (
  <div className="relative rounded-lg overflow-hidden h-screen bg-gray-200 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <HeaderSkeleton />
    <div className="absolute left-10 bottom-20 w-1/2">
      <div className="h-8 w-24 bg-gray-300 rounded-full mb-4" />
      <div className="h-12 w-3/4 bg-gray-300 rounded-lg mb-4" />
      <div className="h-4 w-full bg-gray-300 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
    </div>
    <div className="absolute right-10 bottom-20 w-1/4">
      <div className="h-12 w-full bg-gray-300 rounded-lg mb-4" />
      <div className="h-4 w-2/3 bg-gray-300 rounded" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <section className="h-screen bg-gray-200 animate-pulse">
    <div className="relative flex flex-col h-full p-8">
      <div className="absolute left-10 bottom-20 w-1/2">
        <div className="h-8 w-24 bg-gray-300 rounded-full mb-4" />
        <div className="h-12 w-3/4 bg-gray-300 rounded-lg mb-4" />
        <div className="h-4 w-full bg-gray-300 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
      </div>
      <div className="absolute right-10 bottom-20 w-1/4">
        <div className="h-12 w-full bg-gray-300 rounded-lg mb-4" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
      </div>
    </div>
  </section>
);

export const HeaderSkeleton = () => (
  <header className="flex flex-wrap items-center p-4 lg:p-6">
    <div className="flex items-center flex-grow lg:flex-grow-0">
      <div className="h-10 w-10 bg-gray-300 rounded-full mr-2" />
      <div className="h-6 w-24 bg-gray-300 rounded" />
    </div>
    <div className="hidden lg:flex items-center ml-6 mr-4 space-x-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 w-20 bg-gray-300 rounded" />
      ))}
    </div>
    <div className="flex-grow mx-4">
      <div className="h-10 w-full max-w-md mx-auto bg-gray-300 rounded-lg" />
    </div>
    <div className="flex items-center space-x-4">
      <div className="h-8 w-20 bg-gray-300 rounded" />
      <div className="h-8 w-20 bg-gray-300 rounded" />
    </div>
  </header>
);

export const BodySkeleton = () => (
  <>
    <SectionSkeleton />
    <ArticlesListSkeleton />
  </>
);

export const ArticleCardSkeleton = () => (
  <div className="bg-card rounded-lg shadow-lg overflow-hidden">
    <div className="h-48 bg-gray-300" />
    <div className="p-4">
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-full bg-gray-300 rounded mb-4" />
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gray-300 rounded-full mr-2" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);

export const ArticlesListSkeleton = () => (
  <div className="min-h-screen p-8 flex justify-center">
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <ArticleCardSkeleton />
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <div className="h-10 w-64 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);

export const NavBarSkeleton = () => (
  <nav className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-6 w-20 bg-gray-300 rounded" />
    ))}
  </nav>
);

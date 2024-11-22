'use client';

import {AuthorCard} from "@/components/AuthorCard";
import React, {useState} from "react";
import Link from "next/link";
import {Bookmark, Heart} from "lucide-react";

const Hero = ({
                  authorName,
                  articleID,
                  title,
                  category,
                  description,
                  readTime,
                  date,
                  authorImageUrl,
                  isArticlePage,
              }: {
    authorName: string,
    articleID: number,
    title: string,
    category: string,
    description: string,
    readTime: string,
    date: string,
    authorImageUrl: string,
    isArticlePage?: boolean,
}) => {

    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const userID = articleID; // TODO replace by userID

    return (
        <section className="h-screen bg-cover bg-center text-white overflow-hidden">
            <div className="relative flex flex-col h-full p-8">
                <div className="absolute left-10 bottom-20">
                    <div className="self-start flex items-center space-x-2">
                        <Link href={`/${category.toLowerCase()}`}>
              <span
                  className="inline-flex items-center justify-center px-2 py-2 rounded-full text-md font-medium bg-white/20 text-white whitespace-nowrap min-w-[100px] transition-all hover:bg-white/40 active:bg-white/60 backdrop-blur-lg hover:shadow-md">
                {category}
              </span>
                        </Link>
                        {isArticlePage && <button
                            onClick={toggleLike}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/60 transition-all backdrop-blur-lg"
                            aria-label={isLiked ? "Unlike" : "Like"}
                        >
                            <Heart
                                className={`w-5 h-5 ${
                                    isLiked ? "fill-red-500 text-red-500" : "text-white"
                                }`}
                            />
                        </button>}
                        {isArticlePage && <button
                            onClick={toggleBookmark}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/60 transition-all backdrop-blur-lg"
                            aria-label={isLiked ? "Unbookmark" : "Bookmark"}
                        >
                            <Bookmark
                                className={`w-5 h-5 ${
                                    isBookmarked ? "fill-gray-500 text-gray-500" : "text-white"
                                }`}
                            />
                        </button>}

                    </div>
                    <Link href={`/${category.toLowerCase()}/articles/${articleID.toString()}`}>
                        <h1 className="text-4xl font-bold mt-4">{title}</h1>
                    </Link>
                    <p className="mt-2 max-w-md">{description}</p>
                </div>
                <div className="absolute right-10 bottom-20 space-y-4 flex flex-col items-end">
                    <AuthorCard
                        authorName={authorName}
                        authorImageUrl={authorImageUrl}
                        userID={userID.toString()} // TODO: make all the IDs numbers or strings
                    />
                    <p className="text-sm text-gray-400">{date + " • " + readTime}</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;

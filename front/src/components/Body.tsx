'use client';

import {useEffect, useState} from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArticlesList from "@/components/ArticlesList";
import {useSearchParams} from "next/navigation";
import {fetchFilteredArticles, fetchImageURLs} from "@/lib/utils";

interface IBody {
    category?: string;
}

const Body: React.FC<IBody> = ({category}) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showHero, setShowHero] = useState(true);

    const searchParams = useSearchParams();

    const query = searchParams.get('query')?.toString();

    const imageURLs = fetchImageURLs(category);
    const filteredArticles = fetchFilteredArticles(query, category);
    const totalPages = Math.ceil(filteredArticles.length / 9);
    const currentPage = Number(searchParams.get("page")) || 1 ;


    const filteredPageArticles = fetchFilteredArticles(query, category, currentPage);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredArticles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                className="relative bg-cover bg-center bg-local rounded-lg overflow-hidden transition-all duration-1000"
                style={{backgroundImage: `url(${imageURLs[currentImageIndex]})`}}
            >
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                <Header setShowHeader={setShowHero}/>
                {showHero && (filteredArticles.length !== 0) &&
                    <Hero currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex}/>}
            </div>
            <ArticlesList articles={filteredPageArticles} totalPages={totalPages} currentPage={currentPage}/>
        </>
    )
}

export default Body;

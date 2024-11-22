'use client';

import { useEffect, useState } from "react";
import ArticlesList from "@/components/ArticlesList";
import { useSearchParams } from "next/navigation";
import { fetchFilteredArticles, fetchImageURLs } from "@/lib/utils";
import Section from "@/components/Section";
import { AnimatePresence, motion } from "framer-motion";
import { SectionSkeleton, ArticlesListSkeleton } from "@/components/Skeletons";

interface IBodyProps {
    category?: string;
}

const Body: React.FC<IBodyProps> = ({ category }) => {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
    const [showHero, setShowHero] = useState(true);
    const [isSectionLoading, setIsSectionLoading] = useState(true);
    const [isArticlesListLoading, setIsArticlesListLoading] = useState(true);

    const searchParams = useSearchParams();

    const query = searchParams.get('query')?.toString();

    const imageURLs = fetchImageURLs(category);
    const filteredArticles = fetchFilteredArticles(query, category);
    const totalPages = Math.ceil(filteredArticles.length / 9);
    const currentPage = Number(searchParams.get("page")) || 1;

    const filteredPageArticles = fetchFilteredArticles(query, category, currentPage);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % filteredArticles.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [filteredArticles]);

    useEffect(() => {
        const img = new Image();
        img.src = imageURLs[currentArticleIndex];
        img.onload = () => setIsSectionLoading(false);
        return () => {
            img.onload = null;
        };
    }, [currentArticleIndex, imageURLs]);

    useEffect(() => {
        // Simulate ArticlesList loading
        const timer = setTimeout(() => {
            setIsArticlesListLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const isLoading = isSectionLoading || isArticlesListLoading;

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SectionSkeleton />
                        <ArticlesListSkeleton />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Section
                            currentArticleIndex={currentArticleIndex}
                            setCurrentArticleIndex={setCurrentArticleIndex}
                            imageURL={imageURLs[currentArticleIndex]}
                            showHero={showHero}
                            setShowHero={setShowHero}
                            filteredArticles={filteredArticles}
                            authorName={filteredArticles[currentArticleIndex]?.authorName || ""}
                            title={filteredArticles[currentArticleIndex]?.title || ""}
                            category={filteredArticles[currentArticleIndex]?.category || ""}
                            content={filteredArticles[currentArticleIndex]?.content || ""}
                            readTime={filteredArticles[currentArticleIndex]?.readTime || ""}
                            date={filteredArticles[currentArticleIndex]?.date || ""}
                            authorImageUrl={filteredArticles[currentArticleIndex]?.authorImageUrl || ""}
                            articleId={Number(filteredArticles[currentArticleIndex]?.id || 0)}
                        />
                        <ArticlesList articles={filteredPageArticles} totalPages={totalPages} currentPage={currentPage} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Body;

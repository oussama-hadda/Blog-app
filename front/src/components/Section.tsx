'use client';

import React from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {Article} from "@/lib/Definitions";
import {getArticleDescription} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import DotsList from "@/components/DotsList";

interface ISectionProps {
    imageURL: string,
    currentArticleIndex: number,
    authorName: string,
    articleId: number,
    title: string,
    category: string,
    content: string,
    readTime: string,
    date: string,
    authorImageUrl: string,
    setShowHero?: (showHero: boolean) => void,
    isArticlePage?: boolean,
    showHero?: boolean,
    setCurrentArticleIndex?: (index: number) => void,
    filteredArticles?: Article[],
}

const Section = ({
                     imageURL,
                     filteredArticles,
                     currentArticleIndex,
                     authorName,
                     articleId,
                     title,
                     category,
                     content,
                     readTime,
                     date,
                     authorImageUrl,
                     isArticlePage = false,
                     showHero,
                     setShowHero,
                     setCurrentArticleIndex,
                 }: ISectionProps) => {
    const description = getArticleDescription(content);
    const show = ((showHero !== undefined) ? showHero : true) && (filteredArticles ? filteredArticles.length !== 0 : true);

    return (
            <motion.div
                className="relative rounded-lg overflow-hidden"
                style={{height: show ? '100%' : '80px'}}
                animate={{height: show ? '100%' : '80px'}}
                transition={{duration: 0.5}}
            >
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${imageURL})`}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                />
                <Header setShowHeader={setShowHero}/>
                <AnimatePresence>
                    {show && (
                        <motion.div
                            key="hero"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5}}
                        >
                            <Hero
                                authorName={authorName}
                                title={title}
                                category={category}
                                description={description}
                                readTime={readTime}
                                date={date}
                                authorImageUrl={authorImageUrl}
                                articleID={articleId}
                                isArticlePage={isArticlePage}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {show && <DotsList
                        articles={filteredArticles}
                        currentArticleIndex={currentArticleIndex}
                        setCurrentArticleIndex={setCurrentArticleIndex}
                    />}
            </motion.div>
    )
}

export default Section;

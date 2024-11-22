'use client'

import Image from 'next/image'
import {FC, useState} from 'react'
import {AuthorCard} from "@/components/AuthorCard"
import Link from "next/link"
import {getArticleDescription, reduceArticleTitleLength} from "@/lib/utils"
import {Heart, Bookmark} from "lucide-react"
import {motion} from "framer-motion"

interface ArticleCardProps {
    articleID: string
    imageUrl: string
    category: string
    date: string
    readTime: string
    title: string
    content: string
    authorName: string
    authorImageUrl: string
}

const ArticleCard: FC<ArticleCardProps> = ({
                                               articleID,
                                               imageUrl,
                                               category,
                                               date,
                                               readTime,
                                               title,
                                               content,
                                               authorName,
                                               authorImageUrl,
                                           }) => {
    const description = getArticleDescription(content);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleLike = () => setIsLiked(!isLiked);
    const toggleBookmark = () => setIsBookmarked(!isBookmarked);

    const userID = articleID; // TODO: replace by authorID
    const hoverScale = 1.04;

    return (
        <motion.div
            className="bg-card rounded-lg shadow-lg overflow-hidden group"
            whileHover={{scale: hoverScale}}
            whileTap={{scale: 0.98}}
            transition={{type: "spring", stiffness: 400, damping: 17}}
        >
            <div className="relative h-48 w-full">
                <Link href={`/${category.toLowerCase()}/articles/${articleID}`}>
                    <Image
                        src={imageUrl}
                        alt={reduceArticleTitleLength(title)}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg transition-all group-hover:brightness-90"
                    />
                </Link>
                <div
                    className="absolute top-4 left-4"
                >
                    <motion.div onPointerDownCapture={e => e.stopPropagation()}>
                        <Link href={`/${category.toLowerCase()}`}>
                            <span
                                className="bg-black/50 text-white text-sm font-medium px-3 py-1 rounded-full transition-all hover:bg-black/30 active:bg-black/10">
                                {category}
                            </span>
                        </Link>
                    </motion.div>

                </div>
                <div className="absolute bottom-4 left-4 space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                        className="rounded-full bg-black/30 px-2 py-2 transition-all hover:bg-black/20"
                        onClick={toggleLike}
                        aria-label={isLiked ? "Unlike" : "Like"}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onPointerDownCapture={e => e.stopPropagation()}
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isLiked ? "fill-red-500 text-red-500" : "text-white"
                            }`}
                        />
                    </motion.button>
                    <motion.button
                        className="rounded-full bg-black/30 px-2 py-2 transition-all hover:bg-black/20"
                        onClick={toggleBookmark}
                        aria-label={isBookmarked ? "Unbookmark" : "Bookmark"}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onPointerDownCapture={e => e.stopPropagation()}
                    >
                        <Bookmark
                            className={`w-5 h-5 ${
                                isBookmarked ? "fill-gray-500 text-gray-500" : "text-white"
                            }`}
                        />
                    </motion.button>
                </div>
            </div>
            <div className="p-4">
                <p className="text-muted-foreground text-sm mb-2">
                    {date} • {readTime}
                </p>
                <div>
                    <Link href={`/${category.toLowerCase()}/articles/${articleID}`}>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">{reduceArticleTitleLength(title)}</h3>
                    </Link>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{description}</p>
                <AuthorCard
                    authorName={authorName}
                    authorImageUrl={authorImageUrl}
                    userID={userID}
                />
            </div>
        </motion.div>
    )
}

export default ArticleCard;

'use client'

import {useEffect, useState} from "react"
import {fetchFilteredArticles} from "@/lib/utils"
import Section from "@/components/Section"
import AuthorTabs from "@/components/AuthorTabs"
import {useParams, useSearchParams} from "next/navigation"
import AuthorLargeCard from "@/components/AuthorLargeCard"
import {Button} from "@/components/ui/button"
import WriteArticleModal from "@/components/WriteArticleModal"

export default function Author() {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0)
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false)

    const fetchedArticles = fetchFilteredArticles()
    const totalPages = Math.ceil(fetchedArticles.length / 9)

    const params = useParams<{ userID: string }>()
    const userID: number = Number(params.userID || 0)

    const searchParams = useSearchParams()
    const query = searchParams.get('query')?.toString()
    const currentPage = Number(searchParams.get("page")) || 1
    const filteredPageArticles = fetchFilteredArticles(query, undefined, currentPage)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % fetchedArticles.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [fetchedArticles.length])

    const imageURL = fetchedArticles[currentArticleIndex]?.imageUrl || ""

    const handleWriteArticle = (articleData: { title: string; content: string; image: File | null }) => {
        // Here you would typically send the data to your backend API
        console.log("New article data:", articleData)
        // Close the modal after submission
        setIsWriteModalOpen(false)
    }

    return (
        <>
            <Section
                currentArticleIndex={currentArticleIndex}
                setCurrentArticleIndex={setCurrentArticleIndex}
                imageURL={imageURL}
                showHero={false}
                filteredArticles={fetchedArticles}
                authorName={fetchedArticles[currentArticleIndex]?.authorName || ""}
                title={fetchedArticles[currentArticleIndex]?.title || ""}
                category={fetchedArticles[currentArticleIndex]?.category || ""}
                content={fetchedArticles[currentArticleIndex]?.content || ""}
                readTime={fetchedArticles[currentArticleIndex]?.readTime || ""}
                date={fetchedArticles[currentArticleIndex]?.date || ""}
                authorImageUrl={fetchedArticles[currentArticleIndex]?.authorImageUrl || ""}
                articleId={Number(fetchedArticles[currentArticleIndex]?.id || 0)}
            />
            <div className="container mx-auto px-4 py-8 grid gap-6 md:gap-8">
                <div className="flex justify-between items-normal px-6">
                    <AuthorLargeCard
                        authorName={fetchedArticles[userID - 1]?.authorName || ""}
                        email={fetchedArticles[userID - 1]?.email || ""}
                        authorDescription={fetchedArticles[userID - 1]?.authorDescription || ""}
                        authorImageUrl={fetchedArticles[userID - 1]?.authorImageUrl || ""}
                    />
                    <Button onClick={() => setIsWriteModalOpen(true)}>Write Article</Button>
                </div>
                <AuthorTabs
                    allArticles={fetchedArticles}
                    filteredPageArticles={filteredPageArticles}
                    totalPages={totalPages}
                />
            </div>
            <WriteArticleModal
                isOpen={isWriteModalOpen}
                onClose={() => setIsWriteModalOpen(false)}
                onSubmit={handleWriteArticle}
            />
        </>
    )
}

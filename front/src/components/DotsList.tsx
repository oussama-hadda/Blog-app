import React from "react";
import {Article} from "@/lib/Definitions";


export default function DotsList({
                                     currentArticleIndex,
                                     articles,
                                     setCurrentArticleIndex,
                                 }: {
    currentArticleIndex: number,
    articles?: Article[],
    setCurrentArticleIndex?: (currentImageIndex: number) => void,
}) {

    const handleDotClick = (index: number) => {
        if (setCurrentArticleIndex) setCurrentArticleIndex(index);
    };

    return (
        <div className="absolute bottom-5 left-5 flex space-x-2">
            {articles && articles.length > 1 && articles.map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentArticleIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Show image ${index + 1}`}
                ></button>
            ))}
        </div>
    )
}
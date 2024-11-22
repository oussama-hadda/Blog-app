'use client'

import {Article} from "@/lib/Definitions"
import {AuthorCard} from "@/components/AuthorCard"
import {motion} from "framer-motion"

export default function AuthorsList({articles}: { articles: Article[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {articles.map((article, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: index * 0.1}}
                >
                    <AuthorCard
                        authorName={article.authorName}
                        authorImageUrl={article.authorImageUrl}
                        userID={article.id} // TODO: replace it by userID
                        width={60}
                        height={60}
                        showLargeTooltip={true}
                    />
                </motion.div>
            ))}
        </div>
    )
}

import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import {Article} from "@/lib/Definitions";
import {motion} from "framer-motion";


interface IArticleList {
    articles: Article[];
    totalPages: number;
    currentPage: number;
}

const ArticlesList: React.FC<IArticleList> = ({articles, totalPages}) => {


    return (
        <div className="min-h-screen p-8 flex justify-center">
            {(articles.length !== 0) &&
                <div className="flex flex-col justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: index * 0.1}}
                            >
                                <ArticleCard
                                    articleID={article.id}
                                    imageUrl={article.imageUrl}
                                    category={article.category}
                                    date={article.date}
                                    readTime={article.readTime}
                                    title={article.title}
                                    content={article.content}
                                    authorName={article.authorName}
                                    authorImageUrl={article.authorImageUrl}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={totalPages}/>
                    </div>
                </div>
            }
            {(articles.length == 0) && <p className="flex justify-center font-bold">There are no articles matched.</p>}
        </div>
    )
}

export default ArticlesList;

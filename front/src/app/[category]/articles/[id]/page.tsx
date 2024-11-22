import Section from '@/components/Section';
import articles from "../../../../POCs/articles.json"
import ArticleContent from "@/components/ArticleContent";

export default function Article({params}: { params: { id: string, category: string } }) {

    const currentArticleId = Number(params.id) - 1;

    const article = articles [currentArticleId];

    return (
        <>
            <Section
                currentArticleIndex={currentArticleId}
                imageURL={article.imageUrl}
                authorName={article.authorName}
                title={article.title}
                category={article.category}
                content={article.content}
                readTime={article.readTime}
                date={article.date}
                authorImageUrl={article.authorImageUrl}
                articleId={article.id}
                isArticlePage={true}
            />
            <ArticleContent article={article}/>
        </>
    );
}

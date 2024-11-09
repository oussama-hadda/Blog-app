import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Article {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    excerpt: string;
}

interface CategoryPageProps {
    category: string;
    articles: Article[];
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
    return {
        title: `Articles in ${params.category}`,
    };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
    const { category } = params;

    if (!['category1', 'category2', 'category3'].includes(category)) {
        notFound(); // Redirige vers une page 404 si la catégorie n'existe pas
    }

    const articles = [
        {
            id: '1',
            title: 'Understanding React',
            author: 'John Doe',
            imageUrl: '/assets/placeimg_500_300_arch3.jpg',
            excerpt: 'React is a JavaScript library for building user interfaces...',
        },
        // Plus d'articles ici...
    ];

    return {
        props: { category, articles },
    };
}

const CategoryPage = ({ category, articles }: CategoryPageProps) => {
    return (
        <div>
            <h1>Category: {category}</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.author}</p>
                        <img src={article.imageUrl} alt={article.title} />
                        <p>{article.excerpt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;

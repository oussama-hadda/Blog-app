import Image from 'next/image';
import {FC} from 'react';
import {AuthorCard} from "@/components/AuthorCard";

interface ArticleCardProps {
    imageUrl: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    description: string;
    authorName: string;
    authorImageUrl: string;
}

const ArticleCard: FC<ArticleCardProps> = ({
                                               imageUrl,
                                               category,
                                               date,
                                               readTime,
                                               title,
                                               description,
                                               authorName,
                                               authorImageUrl,
                                           }) => {
    return (
        <div className="transparent rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 w-full">
                <button>
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                </button>
                <div className="absolute top-4 left-4">
                    <button>
                    <span className="bg-black/50 text-white text-sm font-medium px-3 py-1 rounded-full transition-all hover:bg-black/30 active:bg-black/10">
                        {category}
                    </span>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-500 text-sm mb-2">
                    {date} • {readTime}
                </p>
                <button><h3 className="text-lg font-semibold mb-2">{title}</h3></button>
                <p className="text-gray-700 text-sm mb-4">{description}</p>
                <AuthorCard authorName={authorName} authorImageUrl={authorImageUrl}/>
            </div>
        </div>
    );
};

export default ArticleCard;

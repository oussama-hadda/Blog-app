'use client';

import articles from "../POCs/articles.json";
import {AuthorCard} from "@/components/AuthorCard";


const Hero =  (props: {
    currentImageIndex: number;
    setCurrentImageIndex: (currentIndex: number) => void;
}) => {

    const handleDotClick = (index: number) => {
        props.setCurrentImageIndex(index);
    };

    return (
        <section className="h-screen bg-cover bg-center text-white overflow-hidden">
            <div className="relative flex flex-col h-full p-8">
                <div className="absolute left-10 bottom-20">
                    <div className="self-start">
                        <button>
                            <span
                                className="inline-flex items-center justify-center px-2 py-2 rounded-full text-md font-medium bg-white/20 text-white whitespace-nowrap min-w-[100px] transition-all hover:bg-white/40 active:bg-white/60 backdrop-blur-lg hover:shadow-md"
                            >{articles[props.currentImageIndex].category}</span>
                        </button>
                    </div>
                    <button><h1 className="text-4xl font-bold mt-4">{articles[props.currentImageIndex].title}</h1></button>
                    <p className="mt-2 max-w-md">{articles[props.currentImageIndex].description}</p>
                </div>
                <div className="absolute right-10 bottom-20 space-y-4 flex flex-col items-end">
                    <AuthorCard authorName={articles[props.currentImageIndex].authorName}
                                authorImageUrl={articles[props.currentImageIndex].authorImageUrl}/>
                    <p className="text-sm text-gray-400">{articles[props.currentImageIndex].date + " • " + articles[props.currentImageIndex].readTime}</p>
                </div>
                <div className="absolute bottom-5 left-5 flex space-x-2">
                    {articles.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === props.currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Show image ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;

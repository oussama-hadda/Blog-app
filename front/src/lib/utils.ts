import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import articlesData from "../POCs/articles.json"


const articles = articlesData as Article[];
const ITEMS_PER_PAGE = 9;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function isInArticle(article: Article, query: string): boolean {
    const fieldsToCheck = [
        article.category,
        article.title,
        article.description,
        article.authorName,
    ];
    const lowerQuery = query.toLowerCase();

    return fieldsToCheck.some(field =>
        field.toLowerCase().includes(lowerQuery) || lowerQuery.includes(field.toLowerCase())
    );
}

export function fetchFilteredArticles(query?: string, category?: string, page?: number): Article[] {

    const filteredArticles = articles.filter(article => {
        const matchesCategory = category ? article.category === category : true;
        const matchesQuery = query ? isInArticle(article, query) : true;
        return matchesCategory && matchesQuery;
    });

    if (page !== undefined) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredArticles.slice(start, end);
    }

    return filteredArticles;
}


export function fetchImageURLs(category?: string): string[] {
    const filteredArticles = category
        ? articles.filter(article => article.category === category)
        : articles;

    return filteredArticles
        .map(article => article.imageUrl)
        .filter((url): url is string => url !== undefined); // TODO: what if an image is missing?
}


export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};


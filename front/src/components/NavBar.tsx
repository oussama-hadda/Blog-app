'use client';

import Link from "next/link";

import { useParams } from "next/navigation";
import {categories} from "@/lib/Definitions";

const NavBar = () => {
    const params = useParams<{ category: string }>();
    const currentCategory = params.category;

    return (
        <nav className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/${category.toLowerCase()}`}
                    className={`
                        relative
                        hover:text-cyan-400
                        active:text-cyan-600
                        transition
                        duration-300
                        ease-in-out
                        hover:scale-105
                        active:scale-95
                        ${
                        category.toLowerCase() === currentCategory
                            ? "text-cyan-400 scale-105"
                            : ""
                    }
                    `}
                >
                    <span className={`hover-underline ${category.toLowerCase() === currentCategory ? 'active-underline' : ''}`}>
                        {category}
                    </span>
                </Link>
            ))}
            <style jsx>{`
                .hover-underline::after,
                .active-underline::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -2px;
                    height: 2px;
                    background-color: currentColor;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }

                .hover-underline:hover::after,
                .active-underline::after {
                    transform: scaleX(1);
                }

                @media (max-width: 1024px) {
                    .hover-underline::after,
                    .active-underline::after {
                        bottom: -1px;
                    }
                }
            `}</style>
        </nav>
    );
};

export default NavBar;

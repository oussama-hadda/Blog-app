'use client';

import {ChevronLeft, ChevronRight} from "@mynaui/icons-react";
import clsx from 'clsx';
import Link from 'next/link';
import {generatePagination} from "@/lib/utils"
import {usePathname, useSearchParams} from 'next/navigation';


export default function Pagination({totalPages}: { totalPages: number }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    // NOTE: Uncomment this code in Chapter 11

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex space-x-2">
                    {allPages.map((page, index) => {

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    );
}

function PaginationNumber({
                              page,
                              href,
                              isActive,
                          }: {
    page: number | string;
    href: string;
    isActive: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm rounded-lg',
        {
            'z-10 bg-gray-100 text-black': isActive,
            'hover:bg-gray-100': !isActive,
        },
    );

    return isActive ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
                             href,
                             direction,
                             isDisabled,
                         }: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        },
    );

    const icon = direction === 'left' ? (<ChevronLeft className="w-4"/>) : (<ChevronRight className="w-4"/>);

    return isDisabled ? (<div className={className}>{icon}</div>) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}

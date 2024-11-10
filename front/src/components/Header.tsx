'use client';

import {Search} from 'lucide-react';
import {useRef, useState} from "react";
import LanguageMenu from "@/components/LanguageMenu";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
import Image from 'next/image';


interface IHeader {
    setShowHeader: (value: boolean) => void;
}

const Header: React.FC<IHeader> = ({setShowHeader}) => {

    const [language, setLanguage] = useState<string>("EN");

    const menuRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            setShowHeader(false)
            params.set('query', term);
        } else {
            setShowHeader(true);
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <header className="flex justify-between items-center p-6 text-white text-sm overflow-hidden">
            <div className="flex items-center space-x-10">
                <Link href="/">
                    <div className="text-xl font-bold flex flex-row items-center space-x-2">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="rounded-t-lg"
                        />
                        Nature
                    </div>
                </Link>
                <NavBar/>
            </div>
            <div className="relative backdrop-blur-md bg-white/20 rounded-lg w-[25%]">
                <input
                    type="text"
                    placeholder="Search destination..."
                    className="border rounded-lg bg-transparent px-4 py-3 pl-4 pr-10 focus:outline-none w-full text-white placeholder-gray-500"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <button>
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white stroke-[2]"/>
                </button>
            </div>
            <div className="flex items-center space-x-5">
                <div className="relative flex items-center" ref={menuRef}>
                    <LanguageMenu setLanguage={setLanguage}/>
                    <span className="ml-2">{language}</span>
                </div>
                <button
                    className="px-5 py-2 text-white font-semibold rounded-lg transition-all hover:bg-gray/50 active:bg-white/20 hover:shadow-md focus:outline-none">
                    Log In
                </button>
                <button
                    className="bg-white text-black rounded-lg px-4 py-2 font-bold transition-all transform hover:scale-105 active:scale-95 active:bg-gray-200 focus:outline-none">
                    Sign Up
                </button>

            </div>
        </header>
    );
};

export default Header;

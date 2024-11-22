'use client';

import {Menu, Search, X} from 'lucide-react';
import {useEffect, useRef, useState} from "react";
import LanguageMenu from "@/components/LanguageMenu";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
import AnimatedLogo from "@/components/AnimatedLogo";
import SignUpModal from "@/components/SignUpModal";
import LogInModal from "@/components/LogInModal";

interface IHeaderProps {
    setShowHeader?: (value: boolean) => void;
}

const Header: React.FC<IHeaderProps> = ({setShowHeader}) => {
    const [language, setLanguage] = useState<string>("EN");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

    const handleSingUp = (signUpData: { firstName: string, lastName: string, email: string, image: File | null }) => {
        console.log(signUpData);
        setIsSignUpModalOpen(false);
    }

    const [isLogInModalOpen, setIsLogInModalOpen] = useState(false)

    const handleLogIn = (logInData: { email: string, password: string }) => {
        console.log(logInData);
        setIsLogInModalOpen(false);
    }

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            if (setShowHeader) setShowHeader(false);
            params.set('query', term);
        } else {
            if (setShowHeader) setShowHeader(true);
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <header className="flex flex-wrap items-center p-4 lg:p-6 text-white text-sm">
            <div className="flex items-center flex-grow lg:flex-grow-0">
                <Link href="/">
                    <div className="text-xl font-bold flex flex-row items-center space-x-2">
                        <AnimatedLogo/>
                        <span className="text-white transform font-light">Travel</span>
                    </div>
                </Link>
            </div>

            {!isMobileView && (
                <>
                    <div className="hidden lg:flex items-center ml-6 mr-4">
                        <NavBar/>
                    </div>
                    <div className="flex-grow mx-4">
                        <div className="relative backdrop-blur-md bg-white/20 rounded-lg w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search destination..."
                                className="border rounded-lg bg-transparent px-4 py-2 focus:outline-none w-full text-white placeholder-gray-400 text-sm"
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                                defaultValue={searchParams.get('query')?.toString()}
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Search className="h-5 w-5 text-white stroke-2"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative flex items-center" ref={menuRef}>
                            <LanguageMenu setLanguage={setLanguage}/>
                            <span className="ml-2">{language}</span>
                        </div>
                        <button
                            onClick={() => setIsLogInModalOpen(true)}
                            className="px-3 py-1 text-white font-semibold rounded-lg transition-all transform hover:bg-white/20 active:bg-white/30 focus:outline-none">
                            Log In
                        </button>
                        <button
                            onClick={() => setIsSignUpModalOpen(true)}
                            className="bg-white text-black rounded-lg px-3 py-1 font-bold transition-all transform hover:scale-105 active:scale-95 active:bg-gray-200 focus:outline-none">
                            Sign Up
                        </button>
                    </div>
                    <SignUpModal
                        isOpen={isSignUpModalOpen}
                        onClose={() => setIsSignUpModalOpen(false)}
                        onSubmit={handleSingUp}
                    />
                    <LogInModal
                        isOpen={isLogInModalOpen}
                        onClose={() => setIsLogInModalOpen(false)}
                        onSubmit={handleLogIn}
                    />
                </>
            )}

            {isMobileView && (
                <>
                    <button
                        className="ml-auto focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>

                    <div className={`w-full mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="relative backdrop-blur-md bg-white/20 rounded-lg w-full mb-4">
                            <input
                                type="text"
                                placeholder="Search destination..."
                                className="border rounded-lg bg-transparent px-4 py-2 focus:outline-none w-full text-white placeholder-gray-400 text-sm"
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                                defaultValue={searchParams.get('query')?.toString()}
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Search className="h-5 w-5 text-white stroke-2"/>
                            </button>
                        </div>
                        <NavBar/>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center" ref={menuRef}>
                                <LanguageMenu setLanguage={setLanguage}/>
                                <span className="ml-2">{language}</span>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-white font-semibold rounded-lg transition-all hover:bg-white/20 active:bg-white/30 focus:outline-none">
                                    Log In
                                </button>
                                <button
                                    className="bg-white text-black rounded-lg px-3 py-1 font-bold transition-all transform hover:scale-105 active:scale-95 active:bg-gray-200 focus:outline-none">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;

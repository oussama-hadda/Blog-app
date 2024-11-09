'use client';


import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Globe} from "lucide-react";

const languages = [
    { code: 'EN', name: 'English' },
    { code: 'SP', name: 'Spanish' },
    { code: 'FR', name: 'French' },
]

interface ILanguageMenu {
    setLanguage: (code: string) => void;
}

const LanguageMenu: React.FC<ILanguageMenu> = ({setLanguage}) => {

    const chooseLanguage = (code: string) => {
        console.log("I'm called!")
        console.log("code:", code);
        setLanguage(code);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-7 w-7">
                    <Globe className="h-4 w-4 text-black"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => chooseLanguage(lang.code)}>
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default LanguageMenu

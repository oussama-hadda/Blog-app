'use client'

import Image from 'next/image'
import Link from "next/link"
import {motion} from "framer-motion"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import AuthorLargeCard from "@/components/AuthorLargeCard";

interface IAuthorCard {
    authorName: string
    authorImageUrl: string
    userID: string
    email?: string
    authorDescription?: string
    width?: number
    height?: number
    showLargeTooltip?: boolean
}

export const AuthorCard: React.FC<IAuthorCard> = ({
                                                      authorName,
                                                      authorImageUrl,
                                                      userID,
                                                      email,
                                                      authorDescription,
                                                      width = 20,
                                                      height = 20,
                                                      showLargeTooltip = false,
                                                  }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`/users/${userID}`} className="block">
                        <motion.div
                            className="flex flex-row items-center space-x-2 p-4 rounded-lg bg-card hover:bg-accent transition-colors duration-200"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Image
                                src={authorImageUrl}
                                alt={authorName}
                                width={width}
                                height={height}
                                className="rounded-full"
                            />
                            <p className="text-sm font-medium text-center line-clamp-2">{authorName}</p>
                        </motion.div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {!showLargeTooltip && <p>View {authorName}&apos;s profile</p>}
                    {showLargeTooltip &&
                        <Link href={`/users/${userID}`}>
                            <AuthorLargeCard
                                authorName={authorName}
                                email={email || "random@random.com"}
                                authorDescription={authorDescription || "There is no description for this author."}
                                authorImageUrl={authorImageUrl}
                            />
                        </Link>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

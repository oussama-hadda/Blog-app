import {Tabs, TabsContent, TabsList} from "@/components/ui/tabs";
import ArticlesList from "@/components/ArticlesList";
import {useState} from "react";
import {Article} from "@/lib/Definitions";
import {useSearchParams} from "next/navigation";
import TabButton from "@/components/TabButton";
import AuthorsList from "@/components/AuthorsList";

interface IAuthorProps {
    allArticles: Article[], // TODO replace it by a list of authors (see where it's used)
    filteredPageArticles: Article[],
    totalPages: number,
    liked?: string[],
    posts?: string[],
    followers?: string[],
    following?: string[],
}

export default function AuthorTabs({
                                       allArticles,
                                       filteredPageArticles,
                                       totalPages,
                                       liked,
                                       posts,
                                       followers,
                                       following,
                                   }: IAuthorProps) {

    const [activeTab, setActiveTab] = useState("posts");
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    return (
        <Tabs
            defaultValue="posts"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full min-h-screen"
        >
            <TabsList className="grid w-full grid-cols-4">
                <TabButton value={"Posts"} postsOrAuthorsList={posts}/>
                <TabButton value={"Liked"} postsOrAuthorsList={liked}/>
                <TabButton value={"Followers"} postsOrAuthorsList={followers}/>
                <TabButton value={"Following"} postsOrAuthorsList={following}/>
            </TabsList>
            <div className="mt-6 space-y-6">
                <TabsContent value="posts" className="space-y-6">
                    <ArticlesList articles={filteredPageArticles} totalPages={totalPages} currentPage={currentPage}/>
                </TabsContent>
                <TabsContent value="liked" className="space-y-6">
                    <ArticlesList articles={filteredPageArticles} totalPages={totalPages} currentPage={currentPage}/>
                </TabsContent>
                <TabsContent value="followers" className="space-y-6">
                    <AuthorsList articles={allArticles}/>
                </TabsContent>
                <TabsContent value="following" className="space-y-6">
                    <AuthorsList articles={allArticles}/>
                </TabsContent>
            </div>
        </Tabs>
    )
}

import {TabsTrigger} from "@/components/ui/tabs";

export default function TabButton({
                                      value,
                                      postsOrAuthorsList,
                                  }: {
    value: string,
    postsOrAuthorsList?: string[]
}) {
    return (
        <TabsTrigger value={value.toLowerCase()}>
            {value}
            <span className="hidden ml-2 text-muted-foreground sm:block">({postsOrAuthorsList?.length || 2})</span>
        </TabsTrigger>
    )
}

import Image from "next/image";
import {Mail, MapPin} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button"; // Assuming a Button component exists
import {useState} from "react";

interface IAuthorLargeCardProps {
    authorName: string;
    email: string;
    authorDescription: string;
    authorImageUrl: string;
    visitedPlaces?: string[];
}

export default function AuthorLargeCard({
                                            authorName,
                                            email,
                                            authorDescription,
                                            authorImageUrl,
                                            visitedPlaces = ["Ifrane", "Marrakech"],
                                        }: IAuthorLargeCardProps) {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing((prev) => !prev);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Author Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-muted">
                <Image
                    src={authorImageUrl}
                    alt={authorName}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 space-y-4">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{authorName}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                            <Mail className="w-4 h-4"/>
                            <a href={`mailto:${email}`} className="hover:text-primary">
                                {email}
                            </a>
                        </div>
                    </div>

                    <Button
                        onClick={handleFollowClick}
                        variant="outline"
                        className="min-w-[100px] py-2 px-4 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out shadow-md focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </div>

                {/* Card with Description and Visited Places */}
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div>
                            <h2 className="font-semibold mb-2">Description</h2>
                            <p className="text-muted-foreground">{authorDescription}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4"/>
                                Visited places
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {visitedPlaces?.map((place) => (
                                    <div key={place}>
                                        <Badge variant="secondary">
                                            {place}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

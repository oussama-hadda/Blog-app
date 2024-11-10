import Image from 'next/image';


interface IAuthorCard {
    authorName: string;
    authorImageUrl: string;
}

export const AuthorCard: React.FC<IAuthorCard> = ({authorName, authorImageUrl}) => {
    return (
        <button>
            <div className="flex flex-row items-center space-x-2">
                <Image
                    src={authorImageUrl}
                    alt="Author"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                <p>{authorName}</p>
            </div>
        </button>
    )
}

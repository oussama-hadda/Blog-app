'use client'

import {useState} from 'react'
import {AuthorCard} from "@/components/AuthorCard"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"

interface Comment {
    id: string
    authorName: string
    authorImageUrl: string
    userID: string
    content: string
    date: string
}

interface CommentListProps {
    comments: Comment[],
}

export default function CommentsList({comments}: CommentListProps) {
    const [newComment, setNewComment] = useState('')

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the new comment to your backend
        console.log('New comment:', newComment)
        setNewComment('')
    }



    return (
        <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold">Comments</h2>
            <form onSubmit={handleSubmitComment} className="space-y-4">
                <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full"
                />
                <Button type="submit">Post Comment</Button>
            </form>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <AuthorCard
                                    authorName={comment.authorName}
                                    authorImageUrl={comment.authorImageUrl}
                                    userID={comment.userID}
                                    showLargeTooltip={true}
                                    width={40}
                                    height={40}
                                />
                                <span className="text-sm text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm text-foreground px-4">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

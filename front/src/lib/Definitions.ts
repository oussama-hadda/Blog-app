
export interface Article {
    "imageUrl": string,
    "category": string,
    "id": string,
    "date": string,
    "readTime": string,
    "title": string,
    "content": string,
    "authorName": string,
    "authorImageUrl": string,
    "email": string,
    "authorDescription": string,
}

export const categories = [
    "Adventure",
    "Nature",
    "Photography",
    "Travel",
    "Hiking",
    "Wildlife"
]


export interface IModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data) => void
}


export const mockComments = [
  {
    id: '1',
    authorName: 'John Doe',
    authorImageUrl: "/images/oussama.jpg",
    userID: '1',
    content: 'Great article! I really enjoyed reading it.',
    date: '2024-01-20'
  },
  {
    id: '2',
    authorName: 'Jane Smith',
    authorImageUrl: "/images/default_profile.jpg",
    userID: '2',
    content: 'This was very informative. Thanks for sharing!',
    date: '2024-01-21'
  }
]

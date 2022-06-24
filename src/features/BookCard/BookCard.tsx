import React from 'react'
import { IBook } from '../../app/toolkitSlices/booksSearchTypes'
import './BookCard.scss'
import noImagePlaceholder from '../../images/common/no_image_placeholder_130x200.png'
import { useNavigate } from 'react-router-dom'

interface IBookCardProps {
    book: IBook
}

const BookCard = ({ book }: IBookCardProps) => {
    const navigate = useNavigate();

    const navigateDetailedCard = () => {
        navigate(`/books/${book.id}`)
    }

    return (
        <div className='book-card' onClick={navigateDetailedCard}>
            <div className='book-card__img'><img src={book.volumeInfo.imageLinks?.smallThumbnail || noImagePlaceholder} alt={book.volumeInfo.title + ' cover'} /></div>
            <p className='book-card__category'>{book.volumeInfo?.categories?.[0] || 'Don\'t have category'} </p>
            <p className='book-card__title'><b>{book.volumeInfo?.title}</b></p>
            <p className='book-card__authors'>{book.volumeInfo?.authors?.join(", ") || 'Unknown author'}</p>
        </div>
    )
}

export default BookCard
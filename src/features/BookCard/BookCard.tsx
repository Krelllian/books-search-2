import React from 'react'
import { IBook } from '../../app/toolkitSlices/booksSearchTypes'
import './BookCard.scss'
import noImagePlaceholder from '../../images/common/no_image_placeholder_130x200.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { showDetailedBookCard } from '../../app/toolkitSlices/booksSearchSlice'
import { Link } from 'react-router-dom'

interface IBookCardProps {
    book: IBook
}

const BookCard = ({ book }: IBookCardProps) => {
    const isShowDetailedCard = useAppSelector(state => state.booksSearch.showDetailedbookCard)
    const dispatch = useAppDispatch();

    const showDetailedCard = () => {
        dispatch(showDetailedBookCard(book.etag))
        console.log(isShowDetailedCard)
    }

    return (
        <div className='book-card' onClick={showDetailedCard}>
            <div className='book-card__img'><img src={book.volumeInfo.imageLinks?.smallThumbnail || noImagePlaceholder} /></div>
            <p className='book-card__category'>{book.volumeInfo?.categories?.[0] || 'Don\'t have category'} </p>
            <p className='book-card__title'><b>{book.volumeInfo?.title}</b></p>
            <p className='book-card__authors'>{book.volumeInfo?.authors?.join(", ") || 'Unknown author'}</p>
            <Link to={`books/${book.etag}`}>CardDetailed</Link>
        </div>
    )
}

export default BookCard
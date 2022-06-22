import React from 'react'
import { IBook } from '../../app/toolkitSlices/booksSearchTypes'
import './BookCard.scss'

interface IBookCardProps {
    book: IBook
}

const BookCard = ({ book }: IBookCardProps) => {

    console.log('book card props',)
    return (
        <div className='book-card'>
            <div className='book-card__img'><img src={book.volumeInfo.imageLinks.smallThumbnail} /></div>
            <p className='book-card__category'></p>
            <p className='book-card__title'>{book.volumeInfo.title}</p>
            <p className='book-card__authors'></p>

        </div>
    )
}

export default BookCard
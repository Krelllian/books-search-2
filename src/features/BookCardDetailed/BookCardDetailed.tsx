import React from 'react'
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'

interface IBookCardDetailedProps {
    etag: string
}

// { etag }: IBookCardDetailedProps

const BookCardDetailed = () => {

    let { etag } = useParams();

    console.log('etug', etag)
    // const book = useAppSelector(state => state.booksSearch.booksData.find(book => book.etag === etag))

    return (
        <div className='detailed-card'>
            wwww
            {/* {book?.volumeInfo?.title} */}
        </div>
    )
}

export default BookCardDetailed
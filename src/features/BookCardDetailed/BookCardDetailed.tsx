import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IBook } from '../../app/toolkitSlices/booksSearchTypes';
import './BookCardDetailed.scss'

const BookCardDetailed = () => {
    const [bookData, setBookData] = useState<IBook>()

    const { bookId } = useParams();

    useEffect(() => {

        const fetchBookData = async () => {
            const response: AxiosResponse<IBook, any> = await axios({
                method: 'get',
                url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.REACT_APP_API_KEY}`
            })
            return response
        }
        fetchBookData().then(response => setBookData(response.data)).catch(error => console.error("failed to load detailed book data", error))
    }, [bookId])

    return (
        <div className='detailed-card-container container'>
            <div className='detailed-card-content'>
                <div className='detailed-card__col-left'>
                    <img src={bookData?.volumeInfo.imageLinks?.smallThumbnail} alt={bookData?.volumeInfo.title + ' cover'} />
                </div>
                <div className='detailed-card__col-right'>
                    <p className='detailed-card__categories'>{bookData?.volumeInfo.categories || 'Don\'t have category'}</p>
                    <p className='detailed-card__title'>{bookData?.volumeInfo.title}</p>
                    <p className='detailed-card__authors'>{bookData?.volumeInfo.authors?.join(', ')}</p>
                    <div className='detailed-card__description' dangerouslySetInnerHTML={{ __html: `${bookData?.volumeInfo.description || 'Don\'t have description'}` }}></div>
                </div>
            </div>
        </div>
    )
}

export default BookCardDetailed
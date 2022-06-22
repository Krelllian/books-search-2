import React from 'react'
import './BooksList.scss'
import BookCard from '../BookCard/BookCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchBooks } from '../../app/toolkitSlices/booksSearchSlice'

const BooksList = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(state => state.booksSearch.booksData)
  const getDataHandler = () => {
    dispatch(fetchBooks({ bookName: 'js', category: 'all', sortBy: "relevance" }))
    console.log('books', books)
  }

  return (
    <section className="books-list">
      <div className='books-list__container container'>
        <p className='books-list__found'>Found 446 results</p>
        <div className='books-list__book-cards'>
          {books.map(book => {
            return (
              <BookCard book={book} />
            )
          })}
        </div>
        <button onClick={getDataHandler}>get data</button>
      </div>
    </section>
  )
}

export default BooksList
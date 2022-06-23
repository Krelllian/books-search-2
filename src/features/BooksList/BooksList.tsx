import React, { useState } from 'react'
import './BooksList.scss'
import BookCard from '../BookCard/BookCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchBooks, addBooksToState, loadMoreBooks } from '../../app/toolkitSlices/booksSearchSlice'
import BookCardDetailed from '../BookCardDetailed/BookCardDetailed'

const BooksList = () => {

  const booksSearchStore = useAppSelector(store => store.booksSearch)
  const books = booksSearchStore.booksData
  const booksFound = booksSearchStore.foundBooksNumber
  const renderedBooksNumber = booksSearchStore.renderedBooksNumber
  const stateStatus = booksSearchStore.status
  const showBookDetailedCard = booksSearchStore.showDetailedbookCard
  const currentBookEtug = booksSearchStore.showDetailedbookCardEtag

  console.log('renderedBooksNumber', renderedBooksNumber)
  const dispatch = useAppDispatch();

  const loadMoreBooksHandler = () => {
    const input: HTMLInputElement | null = document.querySelector('.header__input')
    const category: HTMLSelectElement | null = document.querySelector('.header__sorting-category__select')
    const sortBy: HTMLSelectElement | null = document.querySelector('.header__sorting-by__select')
    console.log(input?.value, category?.value, sortBy?.value)

    if (input && category && sortBy) {
      dispatch(loadMoreBooks({ bookName: input.value, category: category.value, sortBy: sortBy.value, startIndex: renderedBooksNumber }))
    }
  }

  return (
    <section className="books-list">

      <div className='books-list__container container'>
        {stateStatus === 'loading' ? <p className='books-list__loading'>Loading...</p>
          : <p className='books-list__found '>{booksFound ? `Found ${booksFound} results` : 'No results found'}</p>}
        <div className='books-list__book-cards'>
          {books?.map(book => {
            return (
              <BookCard book={book} key={book.etag} />
            )
          })}
        </div>
        {(renderedBooksNumber >= booksFound) ? '' :
          <button className='books-list__show-more-btn' onClick={loadMoreBooksHandler}>Show more books</button>
        }
      </div>

    </section>
  )
}

export default BooksList
import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useAppDispatch } from '../../app/hooks'
import { fetchBooks } from '../../app/toolkitSlices/booksSearchSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [inputValue, setInputValue] = useState('javascript')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBooks({ bookName: 'javascript', category: '', sortBy: 'relevance' }))
    }, [dispatch])

    const fetchBooksHandler = () => {
        navigate('/')
        const input: HTMLInputElement | null = document.querySelector('.header__input')
        const category: HTMLSelectElement | null = document.querySelector('.header__sorting-category__select')
        const sortBy: HTMLSelectElement | null = document.querySelector('.header__sorting-by__select')

        if (input?.value && category && sortBy) {
            dispatch(fetchBooks({ bookName: input.value, category: category.value, sortBy: sortBy.value }))
        }
    }

    const inputPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        navigate('/')
        const input: HTMLInputElement | null = document.querySelector('.header__input')
        const category: HTMLSelectElement | null = document.querySelector('.header__sorting-category__select')
        const sortBy: HTMLSelectElement | null = document.querySelector('.header__sorting-by__select')
        if (e.key === 'Enter') {
            if (input?.value && category && sortBy) {
                dispatch(fetchBooks({ bookName: input.value, category: category.value, sortBy: sortBy.value }))
            }
        }
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <header className='header'>
            <div className='header-container container'>
                <h1 className='header__title'> Search for books </h1>
                <div className='header__input-wrapper'>
                    <input value={inputValue} onChange={inputHandler} onKeyDown={inputPressEnterHandler} className='header__input' placeholder='Book name...'
                    ></input><button className='header__input-button' onClick={fetchBooksHandler} aria-label="search book"></button>
                </div>
                <div className='header__sorting'>
                    <label className='header__sorting-category'>Categories
                        <select className='header__sorting-category__select' onChange={fetchBooksHandler}>
                            <option value=' '>all</option>
                            <option value='art'>art</option>
                            <option value='biography'>biography</option>
                            <option value='computers'>computers</option>
                            <option value='history'>history</option>
                            <option value='medical'>medical</option>
                            <option value='poetry'>poetry</option>
                        </select>
                    </label>
                    <label className='header__sorting-by'>Sorting by
                        <select className='header__sorting-by__select' onChange={fetchBooksHandler}>
                            <option value='relevance'>relevance</option>
                            <option value='newest'>newest</option>
                        </select>
                    </label>
                </div>
            </div>
        </header>
    )
}

export default Header
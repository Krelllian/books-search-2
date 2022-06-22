import React from 'react'
import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div className='header-container container'>
                <h1 className='header__title'> Search for books </h1>
                <div className='header__input'>
                    <input placeholder='Book name...'></input><button className='header__input-button'></button>
                </div>
                <div className='header__sorting'>
                    <label className='header__sorting-category'>Categories
                        <select>
                            <option value=''>all</option>
                            <option value='art'>art</option>
                            <option value='biography'>biography</option>
                            <option value='computers'>computers</option>
                            <option value='history'>history</option>
                            <option value='medical'>medical</option>
                            <option value='poetry'>poetry</option>
                        </select>
                    </label>
                    <label className='header__sorting-by'>Sorting by
                        <select>
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
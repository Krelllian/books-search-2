import React from 'react';
import './resetStyles.scss'
import './App.scss';
import Header from './features/Header/Header';
import BooksList from './features/BooksList/BooksList';
import { Route, Routes } from 'react-router-dom';
import BookCardDetailed from './features/BookCardDetailed/BookCardDetailed';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<BooksList />} />
        <Route path='/books/:etag' element={<BookCardDetailed />} />
      </Routes>
    </div>
  );
}

export default App;

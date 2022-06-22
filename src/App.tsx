import React from 'react';
import './resetStyles.scss'
import './App.scss';
import Header from './features/Header/Header';
import BooksList from './features/BooksList/BooksList';

function App() {
  return (
    <div className="App">
      <Header />
      <BooksList />
    </div>
  );
}

export default App;

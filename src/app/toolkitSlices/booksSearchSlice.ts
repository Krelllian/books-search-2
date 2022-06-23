import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState, AppThunk } from '../store';
import { IBook, IBooksData, IFetchBooksProps, ILoadMoreBooks } from './booksSearchTypes';

export interface IBooksSearchState {
    booksData: IBook[];
    status: 'idle' | 'loading' | 'failed';
    foundBooksNumber: number,
    renderedBooksNumber: number,
    showDetailedbookCard: boolean,
    showDetailedbookCardEtag: string,
}

const initialState: IBooksSearchState = {
    booksData: [],
    status: 'idle',
    foundBooksNumber: 0,
    renderedBooksNumber: 0,
    showDetailedbookCard: false,
    showDetailedbookCardEtag: '',
};


const apiKey = process.env.REACT_APP_API_KEY
const booksUrl = 'https://www.googleapis.com/books/v1/volumes/'
const q = 'js'

export const fetchBooks = createAsyncThunk(
    'booksSearch/fetchBooks',
    async ({ bookName, category, sortBy }: IFetchBooksProps, { rejectWithValue, dispatch }) => {
        console.log('fetchBooks', process.env.REACT_APP_API_KEY_TWO)

        try {
            const response: AxiosResponse<IBooksData, any> = await axios({
                method: 'get',
                url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}+subject:${category}&orderBy=${sortBy}&printType=books&key=${apiKey}&startIndex=0&maxResults=30`
            });

            dispatch(setTotalBooksNumber(response.data.totalItems))
            dispatch(setBooksData(response.data.items))
            // Сделать проверку на максимальное количество книг, которое можно отрендерить
            dispatch(setRenderedBooksNumber(30))
            console.log(response.data)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);


export const loadMoreBooks = createAsyncThunk(
    'booksSearch/loadMoreBooks',
    async ({ bookName, category, sortBy, startIndex }: ILoadMoreBooks, { rejectWithValue, dispatch }) => {
        const response: AxiosResponse<IBooksData, any> = await axios({
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}+subject:${category}&orderBy=${sortBy}&printType=books&key=${apiKey}&startIndex=${startIndex}&maxResults=10`
        });
        console.log('load more books ', response.data.items)
        dispatch(addBooksToState(response.data.items))
        // Сделать проверку на максимальное количество книг, которое можно отрендерить
        dispatch(increaseRenderedBooksNumber(10))
    }
);

export const booksSearchSlice = createSlice({
    name: 'booksSearch',
    initialState,
    reducers: {
        addBooksToState: (state, action: PayloadAction<IBook[]>) => {
            state.booksData = [...state.booksData, ...action.payload]
        },
        setBooksData: (state, action: PayloadAction<IBook[]>) => {
            state.booksData = action.payload
        },
        setTotalBooksNumber: (state, action: PayloadAction<number>) => {
            state.foundBooksNumber = action.payload
        },
        increaseRenderedBooksNumber: (state, action: PayloadAction<number>) => {
            state.renderedBooksNumber += action.payload
        },
        setRenderedBooksNumber: (state, action: PayloadAction<number>) => {
            state.renderedBooksNumber = action.payload
        },
        hideDetailedBookCard: (state) => {
            state.showDetailedbookCard = false
        },
        showDetailedBookCard: (state, action: PayloadAction<string>) => {
            state.showDetailedbookCard = true
            state.showDetailedbookCardEtag = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                console.log('Server error:', action.payload);
            });
    },
});

export const { increaseRenderedBooksNumber, setTotalBooksNumber, setBooksData, addBooksToState,
    setRenderedBooksNumber, hideDetailedBookCard, showDetailedBookCard, } = booksSearchSlice.actions;

export default booksSearchSlice.reducer;
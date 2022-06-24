import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IBook, IBooksData, IFetchBooksProps, ILoadMoreBooks } from './booksSearchTypes';

export interface IBooksSearchState {
    booksData: IBook[];
    status: 'idle' | 'loading' | 'failed';
    foundBooksNumber: number,
    renderedBooksNumber: number,
}

const initialState: IBooksSearchState = {
    booksData: [],
    status: 'idle',
    foundBooksNumber: 0,
    renderedBooksNumber: 0,
};


const apiKey = process.env.REACT_APP_API_KEY

export const fetchBooks = createAsyncThunk(
    'booksSearch/fetchBooks',
    async ({ bookName, category, sortBy }: IFetchBooksProps, { rejectWithValue, dispatch }) => {

        try {
            const response: AxiosResponse<IBooksData, any> = await axios({
                method: 'get',
                url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}+subject:${category}&orderBy=${sortBy}&printType=books&key=${apiKey}&startIndex=0&maxResults=30`
            });

            dispatch(setTotalBooksNumber(response.data.totalItems))
            dispatch(setBooksData(response.data.items))
            dispatch(setRenderedBooksNumber(30))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);

export const loadMoreBooks = createAsyncThunk(
    'booksSearch/loadMoreBooks',
    async ({ bookName, category, sortBy, startIndex }: ILoadMoreBooks, { rejectWithValue, dispatch }) => {
        try {
            const response: AxiosResponse<IBooksData, any> = await axios({
                method: 'get',
                url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}+subject:${category}&orderBy=${sortBy}&printType=books&key=${apiKey}&startIndex=${startIndex}&maxResults=10`
            });
            dispatch(addBooksToState(response.data.items))
            dispatch(increaseRenderedBooksNumber(10))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
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
                console.error('Failed to load books:', action.payload);
            })
            .addCase(loadMoreBooks.rejected, (state, action) => {
                console.error('Failed to load more books:', action.payload);
            })
    },
});

export const { increaseRenderedBooksNumber, setTotalBooksNumber, setBooksData, addBooksToState,
    setRenderedBooksNumber, } = booksSearchSlice.actions;

export default booksSearchSlice.reducer;
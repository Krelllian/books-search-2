export interface IFetchBooksProps {
    bookName: string,
    category: string,
    sortBy: string,
}

export interface IBooksData {
    items: IBook[],
    kind: string,
    totalItems: number,
}

export interface IBook {
    etag: string,
    id: string,
    volumeInfo: {
        authors?: string[],
        categories?: string[],
        imageLinks?: {
            smallThumbnail?: string,
            thubnail?: string,
            medium?: string,
        }
        language?: string,
        subtitle?: string,
        title?: string,
        description?: string,
    }

}

export interface ILoadMoreBooks {
    bookName: string,
    category: string,
    sortBy: string,
    startIndex: number,
}
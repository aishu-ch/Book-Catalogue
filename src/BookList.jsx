import React from 'react'
import BookListItem from './BookListItem'

export default function BookList(props) {
    const {bookData} = props
  return (
    <div className='bookList'>
        {bookData.map((book) => (
            <BookListItem key={book.key} data={book} />
        ))}
    </div>
  )
}

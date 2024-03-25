import React from 'react'
import { Link } from 'react-router-dom'

export default function BookListItem(props) {

  const bookCoverUrl = `https://covers.openlibrary.org/b/id/${props.data.cover_i}-M.jpg`
  console.log(bookCoverUrl)

  const bookId = props.data.key.split("/works/")[1]
  console.log(bookId)
  return (
    <div className='bookListItem'>
      <img src={bookCoverUrl} />
      <h1 className='title'><Link to={`/bookstatus/${bookId}`}>{props.data.title}</Link></h1>
    </div>
  )
}

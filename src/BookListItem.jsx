import React from 'react'

export default function BookListItem(props) {

  const bookCoverUrl = `https://covers.openlibrary.org/b/id/${props.data.cover_i}-M.jpg`
  console.log(bookCoverUrl)
  return (
    <div className='bookListItem'>
      <img src={bookCoverUrl} />
      <h1 className='title'>{props.data.title}</h1>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import BookList from './BookList'

export default function Home() {
const[bookName, setBookName] = useState("")
const[bookData, setBookData] = useState("")

useEffect(() => {
    const openLibraryUrl = `https://openlibrary.org/search.json?q=${bookName}&limit=12&language=eng`

    const makeApiCall = () => {
      console.log(openLibraryUrl)
        fetch(openLibraryUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setBookData(data.docs)
        })
    }
    makeApiCall()
    }, [bookName])


const handleSubmit = (title) => {
    console.log("Home-handleSubmit-title", title)
    setBookName(title)
}
  return (
    <> 
    <SearchBar handleSubmit={handleSubmit} />
    {bookData.length !== 0 ? <BookList bookData={bookData} /> : null}
    </>
  )
}

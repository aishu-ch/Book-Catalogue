import React, { useState } from "react";

export default function SearchBar(props) {
    const[bookName, setBookName] = useState("")

    const handleChange = (e) => {
        console.log("handleChange clicked")
        const book = e.target.value
        setBookName(book)
    }

    const handleSubmit = (e) => {
        console.log("SearchBar-handleSubmit-bookname", bookName)
        e.preventDefault()
        props.handleSubmit(bookName)
        setBookName("")
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="search-term"
          type="text"
          placeholder="Search for your book here"
          onChange={handleChange}
        />
        <button className="submit button" type="submit" value="Search">
          Search
        </button>
      </form>
    </>
  );
}

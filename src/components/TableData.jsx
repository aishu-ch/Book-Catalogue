import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TableRow from "./TableRow";




export default function TableData(props) {
  const { books } = props;
  const [rows, setRows] = useState([...books]);
  console.log(rows)

  const deleteRow = (bookId) => {
    console.log(bookId)
    const rowToDelete = books.find(({bookIdToFind}) => bookIdToFind === bookId )
    console.log(books.splice(books.indexOf(rowToDelete), 1))
    books.splice(books.indexOf(rowToDelete), 1)
    setRows([...books])
  }

  return (
    <>
      {books.map((book) => {
        return (
          <TableRow book={book} deleteRow={deleteRow} key={book.fields["Book ID"]}/>
        );
      })}
    </>
  );
}

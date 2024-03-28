import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TableRow from "./TableRow";




export default function TableData(props) {
  const { books } = props;
  const [rows, setRows] = useState();
  console.log(rows)
  console.log(books)

  const deleteRow = (bookId) => {
    console.log(bookId)
    const rowToDelete = books.find(book => book.fields["Book ID"] === bookId)
    books.splice(books.indexOf(rowToDelete), 1)
    console.log(rowToDelete)
    console.log(books.indexOf(rowToDelete))
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

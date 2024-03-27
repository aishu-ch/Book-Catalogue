import React, { useEffect, useState } from "react";

const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_APIKEY,
}).base(process.env.REACT_APP_AIRTABLE_BASEID);

export default function TableRow(props) {
  const { book, deleteRow } = props;
  const [status, setStatus] = useState(book.fields["Status"]);

  const handleChange = (bookId) => (e) => {
    // console.log(e.target.name)
    console.log(e.target.value);
    setStatus(e.target.value);

    base("books")
      .select({
        filterByFormula: `{Book ID}="${bookId}"`,
      })
      .firstPage((err, records) => {
        if (records.length !== 0) {
          records.forEach((record) => {
            console.log("Retrieved", record.get("Book Name"));

            base("books").update(
              [
                {
                  id: record.getId(),
                  fields: {
                    Status: e.target.value,
                  },
                },
              ],
              function (err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
                records.forEach(function (record) {
                  console.log(record.get("Book Name"));
                });
              }
            );
          });
        }
      });
  };

  const deleteRecord = (bookId) => (e) => {
    base("books")
      .select({
        filterByFormula: `{Book ID}="${bookId}"`,
      })
      .firstPage((err, records) => {
        if (records.length !== 0) {
          const recordToDelete = records[0];
          console.log("Retrieved", recordToDelete.get("Book Name"));

          base("books").destroy(
            [recordToDelete.getId()],
            function (err, deletedRecords) {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Deleted", deletedRecords.length, "records");
            }
          );
        }
      }, deleteRow(bookId));
  };

  return (
    <tr key={book.fields["Book ID"]}>
      <td>{book.fields["Book Name"]}</td>
      <td>
        <select onChange={handleChange(book.fields["Book ID"])} value={status}>
          <option>Currently Reading</option>
          <option>To Read</option>
          <option>Read</option>
        </select>
      </td>
      <td>
        <button
          className="delete"
          onClick={deleteRecord(book.fields["Book ID"])}
        >
          X
        </button>
      </td>
    </tr>
  );
}

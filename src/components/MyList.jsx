import React, { useEffect, useState } from "react";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_APIKEY }).base(
  process.env.REACT_APP_AIRTABLE_BASEID
);

export default function MyList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    base("books")
      .select({
        // Selecting the first 10 records in Grid view:
        maxRecords: 10,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            console.log("Retrieved", record);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
          setBooks(records);
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  const deleteRecord = () => {

  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.fields["Book ID"]}>
                <td>{book.fields["Book Name"]}</td>
                <td>{book.fields["Status"]}</td>
                <td onClick={deleteRecord}>
                  <button>X</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

import React, { useEffect, useState } from "react";
import TableData from "./TableData";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_APIKEY }).base(
  process.env.REACT_APP_AIRTABLE_BASEID
);

export default function MyList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    base("books")
      .select({
        // Selecting the records in Grid view:
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          // records.forEach(function (record) {
          //   console.log("Retrieved", record);
          // });

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


  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <TableData books={books}/>
        </tbody>
      </table>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

var Airtable = require("airtable");
var base = new Airtable({
  apiKey:
    "pats4X3hVFQG5nvcS.b3b0000259bdce41c53220486a2d912397c9eec11d06f7e9fb40f569a42ca559",
}).base("appD3LdXzSXs2BCPY");

const handleClick = (title, bookId) => (e) => {
  // console.log(e.target.name)
  // console.log(title)

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
                  "Book Name": title,
                  Status: e.target.name,
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
      } else {
        base("books").create(
          [
            {
              fields: {
                "Book Name": title,
                Status: e.target.name,
                "Book ID": bookId,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          }
        );
      }
    });
};

export default function BookStatus() {
  const { bookId } = useParams();
  console.log(bookId);

  const bookNameUrl = `https://openlibrary.org/works/${bookId}.json`;

  const [bookData, setBookData] = useState();

  useEffect(() => {
    fetch(bookNameUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(bookData);

  return bookData ? (
    <>
      <div>
        <button
          name="Read"
          className="status"
          onClick={handleClick(bookData.title, bookId)}
        >
          Read
        </button>
      </div>
      <div>
        <button
          name="To Read"
          className="status"
          onClick={handleClick(bookData.title, bookId)}
        >
          To Read
        </button>
      </div>
      <div>
        <button
          name="Currently Reading"
          className="status"
          onClick={handleClick(bookData.title, bookId)}
        >
          Currently Reading
        </button>
      </div>
    </>
  ) : (
    ""
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// console.log(process.env);
const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_APIKEY,
}).base(process.env.REACT_APP_AIRTABLE_BASEID);


const handleClick = (title, bookId, history) => (e) => {
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
    },
    setTimeout(() => {
      history.push("/mylist")
    }, 1000));
};

export default function BookStatus() {
  const { bookId } = useParams();
  // console.log(bookId);
  const history = useHistory()

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
        <h2>{bookData.title}</h2>
        <h3></h3>

        <button
          name="Read"
          className="read status button"
          onClick={handleClick(bookData.title, bookId, history)}
        >
          Read
        </button>
      </div>
      <div>
        <button
          name="To Read"
          className="status button"
          onClick={handleClick(bookData.title, bookId, history)}
        >
          To Read
        </button>
      </div>
      <div>
        <button
          name="Currently Reading"
          className="status button"
          onClick={handleClick(bookData.title, bookId, history)}
        >

          Currently Reading
        </button>
      </div>
    </>
  ) : (
    ""
  );
}

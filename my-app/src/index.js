import React from "react";
import ReactDOM from "react-dom/client";
import Book from "./Book.js";
import "./index.css";
import { books } from "./books";
// const Greeting = () => {
//   return (
//     <React.Fragment>
//       <Person />
//       <Messsage />
//     </React.Fragment>
//   );
// };
// function Greeting() {
//   return React.createElement("h2", {}, "hello world");
// }

const BookList = () => {
  // const someValue = "shakeAndBake";
  // const displayValue = () => {
  //   console.log(someValue);
  // };

  const getBook = (id) => {
    const book = books.find((book) => book.id === id);
    console.log(book);
  };
  return (
    <>
      <h1>amazon best sellers </h1>
      <section className="booklist">
        {/* <EventExample /> */}
        {books.map((book, index) => {
          return (
            <Book {...book} key={book.id} getBook={getBook} number={index} />
          );
        })}
        {/* <Book
        author={firstBook.author}
        title={firstBook.title}
        img={firstBook.img}
      />

      <Book
        author={secondBook.author}
        title={secondBook.title}
        img={secondBook.img}
      /> */}
        {/* <p> Shubham kumar singh</p> */}
        {/* <Book author={author} title={title} img={img} />
      <Book author={author} title={title} img={img} /> */}
      </section>
    </>
  );
};

// const EventExample = () => {
//   const handleFormInput = () => {
//     console.log("Form input");
//   };
//   const handleButtonClick = () => {
//     alert("Button click");
//   };
//   const handleFormSubmission = (e) => {
//     e.preventDefault();
//     console.log("Form submission");
//   };
//   return (
//     <section>
//       <form onSubmit={handleFormSubmission}>
//         <h2>Typical Form</h2>
//         <input
//           type="text"
//           name="example"
//           style={{ margin: "1rem 0" }}
//           onChange={(e) => console.log(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//         <div>
//           <button type="button" onClick={() => console.log("click")}>
//             click me
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// const Person = () => <h2>John Doe</h2>;
// const Messsage = () => <p>this is my message</p>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BookList />);

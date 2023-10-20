const Book = (props) => {
  const { author, title, img, children, getBook, id, number } = props;
  console.log(number);
  const inlineHeadingStyles = {
    color: "#617d98",
    fontSize: "0.75",
    marginTop: "0.5rem",
  };
  const displayTitle = () => {
    console.log(title);
  };
  const getSingleBook = () => {
    // creating a wrapper for invoking argument function
    getBook(id);
  };
  return (
    <article className="book">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      {children}
      {/* <button onClick={() => getBook(id)}>display title</button> */}
      <h4 style={inlineHeadingStyles}>{author}</h4>
      <span className="number">{`#${number + 1}`}</span>
    </article>
  );
};
export default Book;

export const defaultCategoryBook = "all";
export const defaultSearchBook = "all";
export const categoryData = (
  books,
  bookCategory = defaultCategoryBook,
  searchBook = defaultSearchBook
) => {
  if (bookCategory !== "all") { // process of category search
    return books.filter((book) =>
      book.category.toLowerCase().includes(bookCategory.toLowerCase())
    );
  } else if (searchBook !== "all") { // process of tittle search
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchBook.toLowerCase())
    );
  } else {
    return books;
  }
};

export default categoryData;

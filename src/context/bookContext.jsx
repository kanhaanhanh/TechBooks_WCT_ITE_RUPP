import { createContext, useEffect, useContext, useState } from "react";

import { defaultCategoryBook, defaultSearchBook } from "../utils/categoryData";
import { db } from "../firebase"; // Import your Firestore instance
import { getDocs, doc, addDoc, setDoc, collection } from "firebase/firestore";
export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [category, setCategory] = useState(defaultCategoryBook);
  const [searchBook, setSearchBook] = useState(defaultSearchBook);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  
  // useEffect(() => {
  //   // Fetch data from your JSON file
  //   fetch("../../books.json") // Adjust the path to your JSON file
  //     .then((response) => response.json())
  //     .then((data) => setBooks(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
        setBookCount(booksData.length); // Update book count when fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update book count whenever the books state changes
  useEffect(() => {
    setBookCount(books.length);
  }, [books]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <BookContext.Provider
      value={{ category, setCategory, books, searchBook, setSearchBook, bookCount }}
    >
      {children}
    </BookContext.Provider>
  );
};

const useBookContext = () => useContext(BookContext);
export default useBookContext;

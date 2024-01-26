import { useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Import your Firestore and storage instances
import { ref, deleteObject } from 'firebase/storage';
import {
  getDocs,
  getDoc,
  doc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import SettingDropdown from "./Setting-dropdown";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { UpdateBookForm } from "./UpdateBooks";

const BooksComponent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null); // Add deletingBookId state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm('Are you sure you want to delete this book?');
  
      // If the user confirms, proceed with the deletion
      if (confirmDelete) {
        setDeletingBookId(bookId);
        
        // Get the book document to retrieve imageURL and pdfURL
        const bookDoc = await getDoc(doc(db, 'books', bookId));
        const { coverURL, pdfURL } = bookDoc.data();
  
        // Delete the book document from Firestore
        await deleteDoc(doc(db, 'books', bookId));
  
        // If there's an imageURL, delete the image file from Cloud Storage
        if (coverURL) {
          const imageRef = ref(storage, coverURL);
          await deleteObject(imageRef);
        }
  
        // If there's a pdfURL, delete the PDF file from Cloud Storage
        if (pdfURL) {
          try {
            const pdfRef = ref(storage, pdfURL);
            await deleteObject(pdfRef);
          } catch (storageError) {
            console.error('Error deleting PDF file:', storageError.message);
          }
        } else {
          console.log('No PDF URL provided. Skipping PDF deletion.');
        }
  
        console.log('Book and associated files deleted successfully');
        
        // Update the books state to remove the deleted book
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error('Error deleting book:', error.message);
    } finally {
      setDeletingBookId(null); // Reset the state after the operation is complete
    }
  };

  const handleUpdate = (bookId) => {
    // Placeholder for updating book information
    setSelectedBook(books.find((book) => book.id === bookId));
    console.log(`Update book with ID ${bookId}`);
  };
  
  const updateBookData = async (bookId, updatedData) => {
    try {
      const bookRef = doc(db, "books", bookId);
      await updateDoc(bookRef, updatedData);
      console.log("Book updated successfully");

      // Show alert for successful update
      window.alert("Book updated successfully");

      setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, ...updatedData } : book)));

      // Clear the selectedBook state to reset the update form
      setSelectedBook(null);

    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
  
  useEffect(() => {
    // Scroll down to the book update form
    const updateFormElement = document.getElementById("updateBookForm");
    if (updateFormElement) {
      updateFormElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBook]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="bookListContainer">
        <h2>Books</h2>
        <SettingDropdown check={"AdminBookList"} />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>
              <strong>Title:</strong>
            </th>
            <th>
              <strong>Author:</strong>
            </th>
            <th>
              <strong>Category:</strong>
            </th>
            <th>
              <strong>Published year:</strong>
            </th>
            <th>
              <strong>Description:</strong>
            </th>
            <th>
              <strong>Is Free:</strong>
            </th>
            <th>
              <strong>Book cover</strong>
            </th>
            <th>
              <strong>PDF Source</strong>
            </th>
            <th>
              <strong>Update Book</strong>
            </th>
            <th>
              <strong>Delete Book</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.yearOfPublish}</td>
              <td>{book.description}</td>
              <td>{book.isFree ? "Yes" : "No"}</td>
              <td className="bookListcellImg">
                {book.coverURL && (
                  <img
                    src={book.coverURL}
                    width={50}
                    height={50}
                    alt={`Cover for ${book.title}`}
                  />
                )}
              </td>
              <td>
                {book.pdfURL && (
                  <a
                    href={book.pdfURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue" }}
                  >
                    View
                  </a>
                )}
              </td>
              <td>
                <button onClick={() => handleUpdate(book.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedBook && (
        <div id="updateBookForm">
          <UpdateBookForm
            bookInfo={selectedBook}
            onFormSubmit={(updatedData) =>
              updateBookData(selectedBook.id, updatedData)
            }
          />
        </div>
      )}
    </div>
  );
};

export default BooksComponent;

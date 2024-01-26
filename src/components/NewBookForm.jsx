// File: src/components/BookUploadForm.js
import { useState } from "react";
import PdfUpload from "./PdfUpload";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "../styles/CreateBook.css";
import AdminLayout from "../Layout/AdminLayout";
import Logo from "../assets/new-logo.png";
const BookUploadForm = () => {
  const [bookCover, setBookCover] = useState(null);
  const [pdfSource, setPdfSource] = useState(null);
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    description: "",
    yearOfPublish: "",
    category: "",
    isFree: true,
  });

  const handleBookCoverChange = async (file) => {
    const storageRef = ref(storage, `covers/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading file:", error);
      },
      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setBookCover(downloadURL);
      }
    );
  };

  const handlePdfUpload = (downloadURL) => {
    setPdfSource(downloadURL);
  };

  const handleBookInfoChange = (event) => {
    const { name, value } = event.target;
    setBookInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add book data to Firestore
      const docRef = await addDoc(collection(db, "books"), {
        title: bookInfo.title,
        author: bookInfo.author,
        description: bookInfo.description,
        yearOfPublish: bookInfo.yearOfPublish,
        category: bookInfo.category,
        isFree: bookInfo.isFree,
        coverURL: bookCover,
        pdfURL: pdfSource,
      });

      console.log("Book added with ID:", docRef.id);

      // Clear form fields after successful submission
      setBookCover(null);
      setPdfSource(null);
      setBookInfo({
        title: "",
        author: "",
        description: "",
        yearOfPublish: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding book to Firestore:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="newContainer">
        <div className="top">
          <h1>Create New Free Book</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={Logo} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="bookCover">Book Cover:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBookCoverChange(e.target.files[0])}
                />
              </div>
              <div className="formInput">
                <label htmlFor="pdfSource">PDF Source:</label>
                <PdfUpload onUpload={handlePdfUpload} />
              </div>
              <div className="formInput">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bookInfo.title}
                  placeholder="Html"
                  onChange={handleBookInfoChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookInfo.author}
                  onChange={handleBookInfoChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={bookInfo.description}
                  onChange={handleBookInfoChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="yearOfPublish">Year of Publish:</label>
                <input
                  type="text"
                  id="yearOfPublish"
                  name="yearOfPublish"
                  value={bookInfo.yearOfPublish}
                  onChange={handleBookInfoChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={bookInfo.category}
                  onChange={handleBookInfoChange}
                />
              </div>
              <div>
                <button type="submit">Upload Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookUploadForm;

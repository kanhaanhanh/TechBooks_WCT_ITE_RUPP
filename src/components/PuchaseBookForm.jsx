// File: src/components/PurchaseBookForm.js
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from '../../firebase';
import AdminLayout from "../Layout/AdminLayout";
import Logo from "../assets/new-logo.png";

import { db, storage } from "../firebase";
const PurchaseBookForm = () => {
  const [bookCover, setBookCover] = useState(null);
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    description: "",
    yearOfPublish: "",
    category: "",
    pdfURL: "", // For consistency, even if it's a link from another website
    isFree: false, // Default value is set to false
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
      async (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading cover:", error);
      },
      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setBookCover(downloadURL);
      }
    );
  };

  const handleBookInfoChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setBookInfo((prevInfo) => ({
      ...prevInfo,
      [name]: inputValue,
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
        pdfURL: bookInfo.pdfURL,
        coverURL: bookCover,
        isFree: bookInfo.isFree,
      });

      console.log("Book added with ID:", docRef.id);

      // Clear form fields after successful submission
      setBookCover(null);
      setBookInfo({
        title: "",
        author: "",
        description: "",
        yearOfPublish: "",
        category: "",
        pdfURL: "",
        isFree: false,
      });
    } catch (error) {
      console.error("Error adding book to Firestore:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="newContainer">
        <div className="top">
          <h1>Create New Purchase Book</h1>
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
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bookInfo.title}
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
              <div className="formInput">
                <label htmlFor="pdfURL">
                  PDF URL (Link from another website):
                </label>
                <input
                  type="text"
                  id="pdfURL"
                  name="pdfURL"
                  value={bookInfo.pdfURL}
                  onChange={handleBookInfoChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="isFree">
                  Is Free:
                  <input
                    type="checkbox"
                    id="isFree"
                    name="isFree"
                    checked={bookInfo.isFree}
                    onChange={handleBookInfoChange}
                  />
                </label>
              </div>
              <div>
                <button type="submit">Upload Purchase Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PurchaseBookForm;

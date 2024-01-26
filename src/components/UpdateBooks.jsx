import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import "../styles/CreateBook.css";
export const UpdateBookForm = ({ bookInfo, onFormSubmit }) => {
  const [updatedBookInfo, setUpdatedBookInfo] = useState(bookInfo);
  const [pdfSourceChoice, setPdfSourceChoice] = useState("upload"); // 'upload' or 'link'

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUpdatedBookInfo((prevInfo) => ({
      ...prevInfo,
      [name]: inputValue,
    }));
  };

  const handleBookCoverChange = async (file) => {
    try {
      // Upload the file to storage
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

          // Update the book cover URL in the local state
          setUpdatedBookInfo((prevInfo) => ({
            ...prevInfo,
            coverURL: downloadURL,
          }));

          console.log("Book cover updated successfully");
        }
      );
    } catch (error) {
      console.error("Error handling book cover change:", error);
    }
  };

  const handlePdfUpload = async (file) => {
    try {
      // Upload the PDF file to storage
      const storageRef = ref(storage, `pdfs/${file.name}`);
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
          console.error("Error uploading PDF file:", error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update the PDF URL in the local state
          setUpdatedBookInfo((prevInfo) => ({
            ...prevInfo,
            pdfURL: downloadURL,
          }));

          console.log("PDF file uploaded successfully");
        }
      );
    } catch (error) {
      console.error("Error handling PDF upload:", error);
    }
  };

  const handlePdfSourceChoiceChange = (e) => {
    setPdfSourceChoice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge updatedBookInfo with the new values for PDF source
    const updatedBookData = {
      ...updatedBookInfo,
      pdfURL: pdfSourceChoice === "upload" ? updatedBookInfo.pdfURL : "", // Include pdfURL only if the choice is 'link'
    };

    onFormSubmit(updatedBookData);
  };

  return (
    <div className="newContainer">
      <div className="top">
        <h1>Update Book</h1>
      </div>
      <div className="bottom">
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
          <label>Choose PDF Source:</label>
          <div className="formInput">
            <label>
              <input
                type="radio"
                value="upload"
                checked={pdfSourceChoice === "upload"}
                onChange={handlePdfSourceChoiceChange}
                width={10}
              />
              Upload PDF
            </label>
          </div>
          <div className="formInput">
            <label>
              <input
                type="radio"
                value="link"
                checked={pdfSourceChoice === "link"}
                onChange={handlePdfSourceChoiceChange}
              />
              Provide Link
            </label>
          </div>
        </div>

        {pdfSourceChoice === "upload" && (
          <div className="formInput">
            <label htmlFor="pdfSource">PDF Source:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e.target.files[0])}
            />
          </div>
        )}

        {pdfSourceChoice === "link" && (
          <div className="formInput">
            <label htmlFor="pdfURL">PDF URL (Link from another website):</label>
            <input
              type="text"
              id="pdfURL"
              name="pdfURL"
              value={updatedBookInfo.pdfURL || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className="formInput">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedBookInfo.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="formInput">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={updatedBookInfo.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="formInput">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={updatedBookInfo.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="formInput">
          <label htmlFor="yearOfPublish">Year of Publish:</label>
          <input
            type="text"
            id="yearOfPublish"
            name="yearOfPublish"
            value={updatedBookInfo.yearOfPublish}
            onChange={handleInputChange}
          />
        </div>
        <div className="formInput" >
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={updatedBookInfo.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="formInput">
          <label htmlFor="isFree">Is Free:</label>
          <input
            type="checkbox"
            id="isFree"
            name="isFree"
            checked={updatedBookInfo.isFree}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" >Update Book</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

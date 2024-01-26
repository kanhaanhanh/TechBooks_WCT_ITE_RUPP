import AdminLayout from "../../Layout/AdminLayout";
import "../../styles/CreateBook.css";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import {  useState } from "react";
const CreateNewBook = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  function handleAdd() {
    console.log("Create");
  }
  const bookInputs = [
    {
      id: 1,
      label: "title",
      type: "text",
      placeholder: "Html ",
    },
    {
      id: 2,
      label: "author",
      type: "text",
      placeholder: "F. Scott Fitzgerald",
    },
    {
      id: 3,
      label: "description",
      type: "text",
      placeholder: "A novel about the American Dream...",
    },
    {
      id: 4,
      label: "publishYear",
      type: "text",
      placeholder: "1925",
    },
    {
      id: 5,
      label: "category",
      type: "text",
      placeholder: "Classic",
    },
    {
      id: 6,
      label: "pageNumber",
      type: "text",
      placeholder: "300",
    },
    {
      id: 7,
      label: "fileSize",
      type: "text",
      placeholder: "5 MB",
    },

    {
      id: 8,
      label: "language",
      type: "text",
      placeholder: "English",
    },
    {
      id: 9,
      label: "isFree",
      type: "text",
      placeholder: "false ",
    },
    {
      id: 10,
      label: "purchaseLink",
      type: "text",
      placeholder: "https://www.amazon.com/Natural-Language-Processing-Python-Analyzing/dp/0596516495/ref=sr_1_1?crid=33FRRFTJ231EH&keywords=natural+language+processing+with+python&qid=1704898890&sprefix=natural+languag%2Caps%2C358&sr=8-1",
    },
  ];
  return (
    <AdminLayout>
      <div className="newContainer">
        <div className="top">
          <h1>Create New Book</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <MdOutlineDriveFolderUpload className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {bookInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                create
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateNewBook;

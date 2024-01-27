import "../styles/Widget.css";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdPersonOutline,
} from "react-icons/md";
import { FaBookAtlas } from "react-icons/fa6";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/bookContext";
import { userAuthContext } from "../context/userAuthContext";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Widget = ({ type }) => {
  const [diff, setDiff] = useState(null);
  let data;
  const { books } = useContext(BookContext);
  const {users} = useContext(userAuthContext)
  const [bookRequests, setBookRequests] = useState([]);

  // fetch data from database
  useEffect(() => {
    const fetchBookRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookRequests'));
        const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookRequests(requests);
      } catch (error) {
        console.error('Error fetching book requests: ', error);
      }
    };

    fetchBookRequests();
  }, []);
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isCheck: false,
        link: "See all users",
        to: "/UserDOAD",
        amount:users.length,
        icon: (
          <MdPersonOutline
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };

      break;
    case "book":
      data = {
        title: "BOOKS",
        isCheck: false,
        link: "View all books",
        to: "/BookDOAD",
        amount: books.length,
        icon: (
          <FaBookAtlas
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      // setAmount(books.length)

      break;

      case "request":
      data = {
        title: "Request",
        isCheck: false,
        link: "View all request books",
        to: "/MessageDOAD",
        amount: bookRequests.length,
        icon: (
          <FaBookAtlas
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="leftW">
        <span className="title">{data.title}</span>
        <span className="counter">
        {data.title != "USERS"? data.title!= "BOOKS"?data.amount > 1?data.amount + " requests": data.amount + " request": data.amount > 1? data.amount + " books": data.amount + " book": data.amount > 1? data.amount + " users": data.amount + " user"}
        </span>
        <Link to={data.to}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="rightW">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdOutlineKeyboardArrowUp />
          )}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

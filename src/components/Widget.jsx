import "../styles/Widget.css";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdPersonOutline,
} from "react-icons/md";
import { FaBookAtlas } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/bookContext";
import { userAuthContext } from "../context/userAuthContext";

const Widget = ({ type }) => {
  const [diff, setDiff] = useState(null);
  let data;
  const { books } = useContext(BookContext);
  const {users} = useContext(userAuthContext)
  console.log(users)
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
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="leftW">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.title != "USERS"
            ? data.amount > 1
              ? data.amount + " books"
              : data.amount + " book"
            : data.amount > 1
            ? data.amount + " users"
            : data.amount + " user"}
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

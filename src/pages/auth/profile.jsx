import { useContext, useEffect, useState } from "react";
import { useAuth, upload } from "../../firebase";
import AppLayout from "../../Layout/AppLayout";
import { Button } from "react-bootstrap";
import { userAuthContext } from "../../context/userAuthContext";
import { FaCamera } from 'react-icons/fa';
import '../../styles/profile.css';

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const { user } = useContext(userAuthContext);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <AppLayout isUserLoggedIn={user != null ? true : false}>
      <div className="fields">
        <div className="card-wrapper">
          <img src={photoURL} alt="Avatar" className="avatar" />
          <label htmlFor="file-input" className="file-icon">
            <FaCamera size={45} className="file-icon " />
            <input type="file" onChange={handleChange} id="file-input" />
          </label>
          <Button disabled={loading || !photo} onClick={handleClick} style={{width: "200px"}}>
            Upload
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
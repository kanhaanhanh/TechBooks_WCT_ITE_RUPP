import React, { useState, useEffect } from "react";
import {deleteUser} from 'firebase/auth';
import { db, auth } from "../firebase";
import {
  getDocs,
  doc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Table from "react-bootstrap/Table";
const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userinformation"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  
      // If the user confirms, proceed with the deletion
      if (confirmDelete) {
        // Delete user from Firestore
        await deleteDoc(doc(db, "userinformation", userId));
        await deleteDoc(doc(db, "savedBooks", userId));
        console.log('Document deleted successfully');
  
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUpdatedRole(user.role); // Set the initial value of the updated role
  };

  const handleUpdateRole = async () => {
    try {
      // Update the user's role in Firestore
      await updateDoc(doc(db, "userinformation", selectedUser.id), {
        role: updatedRole,
      });

      // Update the user's role in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: updatedRole } : user
        )
      );

      // Clear the selected user and updated role
      setSelectedUser(null);
      setUpdatedRole("");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <h2>Users</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>
              <strong>ID:</strong>
            </th>
            <th>
              <strong>Email:</strong>
            </th>
            <th>
              <strong>First Name:</strong>
            </th>
            <th>
              <strong>Last Name:</strong>
            </th>
            <th>
              <strong>Role:</strong>
            </th>

            <th>
              <strong>Update</strong>
            </th>
            <th>
              <strong>Delete</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td> {user.firstname}</td>
              <td>{user.lastname}</td>
              <td>
                {" "}
                {selectedUser && selectedUser.id === user.id ? (
                  <input
                    type="text"
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {selectedUser && selectedUser.id === user.id && (
                  <button onClick={handleUpdateRole}>Update Role</button>
                )}
                {!selectedUser && (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
              </td>

              <td>
                {" "}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <ul>
         {users.map((user) => (
          <li key={user.id}>
            <strong>Email:</strong> {user.email}<br />
            <strong>First Name:</strong> {user.firstname}<br />
            <strong>Last Name:</strong> {user.lastname}<br />
            <label>
              <strong>Role:</strong>{' '}
              {selectedUser && selectedUser.id === user.id ? (
                <input
                  type="text"
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                />
              ) : (
                user.role
              )}
            </label>
            {selectedUser && selectedUser.id === user.id && (
              <button onClick={handleUpdateRole}>Update Role</button>
            )}
            {!selectedUser && <button onClick={() => handleEdit(user)}>Edit</button>}<br />
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UsersComponent;

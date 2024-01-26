import "../styles/Datatable.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
const Datatable = ({ pageCheck }) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {pageCheck != "userDisplay" ? (
          <>
            <h3>All Book</h3>
            <Link to="/BookDOAD/create" className="linkCreate">
              Add New
            </Link>
          </>
        ) : (
          <h3> All User</h3>
        )}
      </div>
      <Table className="datagrid" striped bordered hover>
        {pageCheck != "userDisplay" ?
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>FileSize</th>
                <th>Language</th>
                <th>IsFree</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>The Great Gatsby</td>
                <td>F. Scott Fitzgerald</td>
                <td>Classic</td>
                <td>5 MB</td>
                <td>English</td>
                <td>false</td>

              </tr>
              <tr>
                <td>2</td>
                <td>To Kill a Mockingbird</td>
                <td>Harper Lee</td>
                <td>Classic</td>
                <td>6 MB</td>
                <td>English</td>
                <td>true</td>
              </tr>
              <tr>
              <td>3</td>
                <td>To Kill a Mockingbird</td>
                <td>Harper Lee</td>
                <td>Classic</td>
                <td>6 MB</td>
                <td>English</td>
                <td>true</td>
              </tr>
            </tbody>
          </>
        : (
          <>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark@gmail.com</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Jacob@gmail.com</td>
                <td>user</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Thornton</td>
                <td>Thornton@gmail.com</td>
                <td>user</td>
              </tr>
            </tbody>
          </>
        )}
      </Table>
    </div>
  );
};

export default Datatable;

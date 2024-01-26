import AdminLayout from "../../Layout/AdminLayout"
import BooksComponent from "../../components/BookLists";

// import Datatable from "../../components/Datatable";
import "../../styles/AdminSomethingDisplay.css"

const BookDisplayOnAdminDashboard = () => {
  return (
    <AdminLayout>
         <div className="listContainer">
        <BooksComponent/> 
      </div>
    </AdminLayout>
    
  )
}

export default BookDisplayOnAdminDashboard
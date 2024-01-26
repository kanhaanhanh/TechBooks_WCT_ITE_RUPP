import AdminLayout from "../../Layout/AdminLayout";
import Datatable from "../../components/Datatable";
import UsersComponent from "../../components/UserLists";
import "../../styles/AdminSomethingDisplay.css"
const UserDisplayOnAdminDashboard = () => {
  return (
    <AdminLayout>
     <div className="listContainer">
        {/* <Datatable pageCheck={"userDisplay"}/> */}
        <UsersComponent/>
      </div>
  </AdminLayout>
  )
}

export default UserDisplayOnAdminDashboard
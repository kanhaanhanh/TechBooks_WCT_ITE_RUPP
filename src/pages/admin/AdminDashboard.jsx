import AdminLayout from "../../Layout/AdminLayout";
import Widget from "../../components/Widget";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="ADwidgets">
        <Widget type="user" />
        <Widget type="book" />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

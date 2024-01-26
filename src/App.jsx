// src/App.jsx
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import First_page from "./pages/home/First_page";
import DetailBook from "./pages/home/Detail_free";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookProvider } from "./context/bookContext";
import { UserAuthContextProvider } from "./context/userAuthContext";
import PersonalProfile from "./pages/auth/user_information";
import BookHistory from "./pages/book/history_page";
import MyDrive from "./pages/book/mydrive";
import BookRequestPage2 from "./pages/book/book-request-page2";
import BookRequestPage1 from "./pages/book/book-request-page1";
import SwitchPage from "./pages/book/SwitchPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AppLayout from "./Layout/AppLayout";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDisplayOnAdminDashboard from "./pages/admin/UserDisplayOnAdminDashboard";
import BookDisplayOnAdminDashboard from "./pages/admin/BookDisplayOnAdminDashboard";
import MessageDisplayOnAdminDashboard from "./pages/admin/MessageDisplayOnAdminDashboard";
// import CreateNewBook from "./pages/book/createNewBook";
import BookUploadForm from "./components/NewBookForm";
import RequestBookDisplayOnAdminDashboard from "./pages/admin/RequestBookDisplayOnAdminDashboard";
// import { UpdateBookForm } from "./components/UpdateBooks";
import PurchaseBookForm from "./components/PuchaseBookForm";

function App() {
  return (
    <BookProvider>
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<First_page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/book-details/:bookId" element={<DetailBook />} />
            <Route
              path="/Account-Setting"
              element={
                <ProtectedRoute>
                  <PersonalProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/About-Us"
              element={
                <AppLayout>
                  <h1>404 Not Found!</h1>
                </AppLayout>
              }
            />
            <Route
              path="/History"
              element={
                <ProtectedRoute>
                  <BookHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/My-Drive"
              element={
                <ProtectedRoute>
                  <MyDrive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserDOAD"
              element={
                <ProtectedRoute>
                  <UserDisplayOnAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/BookDOAD"
              element={
                <ProtectedRoute>
                  <BookDisplayOnAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createFreeBook"
              element={
                <ProtectedRoute>
                 <BookUploadForm />
                </ProtectedRoute>
              }
            />
             <Route
              path="/createNotFreeBook"
              element={
                <ProtectedRoute>
                  <PurchaseBookForm/>
                </ProtectedRoute>
              }
            />
           
            <Route
              path="/MessageDOAD"
              element={
                <ProtectedRoute>
                  <MessageDisplayOnAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RequestBookDOAD"
              element={
                <ProtectedRoute>
                  <RequestBookDisplayOnAdminDashboard/>
                </ProtectedRoute>
              }
            />
          
            <Route path="/Request-Books/page2" element={<BookRequestPage2 />} />
            <Route path="/Request-Books/page1" element={<BookRequestPage1 />} />
            <Route path="/SwitchPage" element={<SwitchPage />} />
            <Route path="/Forgot-Password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </BookProvider>
  );
}

export default App;

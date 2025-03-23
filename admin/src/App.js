import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

const App = () =>{

  let admin = false;
  const storedData = localStorage.getItem("persist:user");

  if(storedData){
    try {
      const parsedData = JSON.parse(storedData);
      const user = parsedData.user ? JSON.parse(parsedData.user) : null;
      admin = user?.currentUser?.isAdmin || false;
    } catch (error) {
      console.log("Error parsing user data:", error);
    }
  }

  return (
    <Router>
      <Routes>
        {/*Ensure login page is accessible for non-logged-in users*/}
        <Route path="/login" element={admin ? <Navigate to='/'/> : <Login/> } />
         {/*Redirect unauthenticated users to login page*/}
        {!admin ? <Route path="*" element={<Navigate to="/login" />} /> : null}
      </Routes>

      {/*Render the dashboard only if the user is admin*/}
      { admin && 
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
          </Routes>
        </div>
      </>
      }
    </Router>
  );
}

export default App;
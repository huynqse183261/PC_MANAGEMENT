import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Customer_pages/Product";
import Home from "./pages/Customer_pages/Home";
import Dashboard from "./pages/admin_pages/Dashboard";
import Users from "./pages/admin_pages/Users";
import ProductA from "./pages/admin_pages/ProductA";
import UpdateProduct from "./pages/admin_pages/UpdateProduct";
import LoginPage from "./pages/components/LoginPage";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import RegisterPage from "./pages/components/RegisterPage";
import ProfilePage from "./pages/Customer_pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        {/* New route for profile */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

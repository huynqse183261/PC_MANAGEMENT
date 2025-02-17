import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { apiService } from "../../api/services";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
  };

  const handleLogout = async () => {
    try {
      await apiService.logoutAccount();
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      setUsername("");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <h1>PC Shop</h1>
        </Link>

        {/* Navigation */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/product" className="nav-link">Sản phẩm</Link>
          <Link to="/build-pc" className="nav-link">Xây dựng PC</Link>
          <Link to="/about" className="nav-link">Giới thiệu</Link>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* User Section */}
        <div className="user-section">
          {username ? (
            <div className="user-icon">
              <FaUser />
              <span className="username">{username}</span>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Thông tin cá nhân</Link>
                <Link to="/orders" className="dropdown-item">Đơn hàng</Link>
                <button onClick={handleLogout} className="dropdown-item logout-button">
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-button">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

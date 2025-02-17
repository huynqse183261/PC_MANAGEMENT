import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../../api/services";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiService.login(formData);
      const { role, username, email, status } = response;

      if (status === "inactive") {  
        setError("Tài khoản của bạn không hoạt động!");
        return;
      }

      if (role) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        
        // Chuyển hướng dựa vào role
        navigate(role === "Admin" ? "/dashboard" : "/");
      } else {
        setError("Phản hồi từ server không hợp lệ!");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin!"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <div className="login-footer">
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

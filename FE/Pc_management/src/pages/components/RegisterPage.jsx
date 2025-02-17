import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../../api/services";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Xóa thông báo lỗi khi người dùng bắt đầu nhập
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Tạo object data theo đúng format API yêu cầu
      const registerData = {
        userName: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await apiService.register(registerData);

      if (response) {
        // Đăng ký thành công
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err.response) {
        // Xử lý response error từ server
        const errorMessage = err.response.data?.message || "Đăng ký không thành công!";
        
        if (errorMessage.includes("email")) {
          setError("Email đã tồn tại trong hệ thống!");
        } else if (errorMessage.includes("username")) {
          setError("Tên người dùng đã tồn tại!");
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        // Lỗi không nhận được response
        setError("Không thể kết nối đến server. Vui lòng thử lại sau!");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký tài khoản</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên người dùng:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Nhập tên người dùng"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
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
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
        <div className="register-footer">
          <p>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 
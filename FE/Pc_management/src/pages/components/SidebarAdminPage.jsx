import { Layout, Menu } from "antd";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "../styles/SidebarAdminPage.css";
import { apiService } from '../../api/services';

const { Sider } = Layout;

const SidebarAdminPage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Nếu không phải Admin, chuyển về trang chủ
  if (role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    try {
      await apiService.logoutAccount();
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Sider className="sidebar" collapsible>
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          <Link to="/products">Quản lý sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/users">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdminPage;

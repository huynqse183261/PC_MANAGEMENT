import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  
  if (!role) {
    // Nếu chưa đăng nhập, chuyển về trang login
    return <Navigate to="/login" replace />;
  }

  if (role !== 'Admin') {
    // Nếu không phải Admin, chuyển về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu là Admin, cho phép truy cập
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute; 
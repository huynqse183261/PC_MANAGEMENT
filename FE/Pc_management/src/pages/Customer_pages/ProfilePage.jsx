import { useState, useEffect } from 'react';
import { Card, Avatar, Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    role: localStorage.getItem('role') || ''
  });

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [form, userData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue(userData);
    setIsEditing(false);
  };

  const handleSave = async (values) => {
    try {
      // Giả sử bạn có API endpoint để cập nhật thông tin người dùng
      // await apiService.updateProfile(values);
      
      setUserData({
        ...userData,
        ...values
      });
      
      // Cập nhật localStorage
      localStorage.setItem('username', values.username);
      localStorage.setItem('email', values.email);
      
      message.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error) {
      message.error('Không thể cập nhật thông tin: ' + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-header">
            <Avatar size={100} icon={<UserOutlined />} />
            <h2>Thông tin cá nhân</h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={userData}
          >
            <Form.Item
              label="Tên người dùng"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name="role"
            >
              <Input disabled={true} />
            </Form.Item>

            <div className="profile-actions">
              {!isEditing ? (
                <Button type="primary" onClick={handleEdit}>
                  Chỉnh sửa thông tin
                </Button>
              ) : (
                <>
                  <Button type="primary" htmlType="submit">
                    Lưu thay đổi
                  </Button>
                  <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                    Hủy
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage; 
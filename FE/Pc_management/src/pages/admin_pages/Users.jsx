import { useEffect, useState } from 'react';
import { Table, Button, message, Select, Modal } from 'antd'; // Import Modal
import { apiService } from '../../api/services';
import '../styles/Users.css';
import SidebarAdminPage from '../components/SidebarAdminPage';

const { Option } = Select;

const Users = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await apiService.getAllAccounts();
                
                // Sắp xếp dữ liệu theo yêu cầu
                const sortedData = data.sort((a, b) => {
                    if (a.role === 'Admin' && b.role !== 'Admin') return -1; // Admin đứng đầu
                    if (a.role !== 'Admin' && b.role === 'Admin') return 1; // Customer đứng sau Admin
                    if (a.role === 'Customer' && b.role === 'Customer') {
                        return a.username.localeCompare(b.username); // Sắp xếp theo tên người dùng
                    }
                    return 0; // Không thay đổi thứ tự
                });

                setAccounts(sortedData);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this account?',
            onOk: async () => {
                try {
                    await apiService.deleteAccount(id);
                    message.success('Account deleted successfully');
                    // Refresh the account list
                    const data = await apiService.getAllAccounts();
                    setAccounts(data);
                } catch (error) {
                    console.error('Error deleting account:', error);
                    message.error('Failed to delete account');
                }
            },
        });
    };

    const handleUpdateStatus = async (id, status) => {
        Modal.confirm({
            title: 'Are you sure you want to update the account status?',
            onOk: async () => {
                try {
                    await apiService.updateAccountStatus(id, status);
                    message.success(`Account status updated to ${status}`);
                    // Refresh the account list
                    const data = await apiService.getAllAccounts();
                    setAccounts(data);
                } catch (error) {
                    console.error('Error updating account status:', error);
                    message.error('Failed to update account status');
                }
            },
        });
    };

    const columns = [
        {
            title: 'Account ID',
            dataIndex: 'accountid',
            key: 'accountid',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Update Status',
            key: 'updateStatus',
            render: (text, record) => (
                <Select
                    defaultValue={record.status}
                    onChange={(value) => handleUpdateStatus(record.accountid, value)}
                    disabled={record.role === 'Admin' || record.role === 'admin'}
                >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                    
                </Select>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Button 
                    type="danger" 
                    onClick={() => handleDelete(record.accountid)} 
                    disabled={record.role === 'Admin' || record.role === 'admin'}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
        <SidebarAdminPage />
        <div className="users-container">
            <h1>Account Information</h1>
            <Table
                dataSource={accounts}
                columns={columns}
                loading={loading}
                rowKey="accountid"
            />
        </div>
        </>
    );
};

export default Users;
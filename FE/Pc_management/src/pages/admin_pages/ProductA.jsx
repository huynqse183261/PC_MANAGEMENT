import { useEffect, useState } from 'react';
import { Table, Image, Button, Popconfirm, message } from 'antd';
import { apiService } from '../../api/services';
import SidebarAdminPage from '../components/SidebarAdminPage';
import CreateProduct from './CreateProduct'; // Import CreateProduct component
import { useNavigate } from 'react-router-dom';
import '../styles/ProductA.css';  

const ProductList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getList(); // Gọi API getList
                setData(result); // Cập nhật dữ liệu
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Đặt loading thành false sau khi hoàn thành
            }
        };

        fetchData();
    }, []);

    const showModal = () => {
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Đóng modal
    };

    const refreshData = async () => {
        // Refresh data after adding a new product
        const result = await apiService.getList();
        setData(result);
    };

    const handleDelete = async (id) => {
        try {
            await apiService.deleteProduct(id); // Ensure you have a delete function in your apiService
            message.success('Product deleted successfully!');
            refreshData();
        } catch (error) {
            message.error('Error deleting product: ' + (error.response?.data?.message || error.message));
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'productid',
            key: 'productid',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <Image 
                    width={100} 
                    src={`/src/assets/images/${text}`} 
                    alt="Product Image" 
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button 
                        type="link" 
                        onClick={() => {
                            console.log(`Navigating to update product with ID: ${record.productid}`);
                            navigate(`/update-product/${record.productid}`);
                        }}
                    >
                        Update
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record.productid)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <>
            <SidebarAdminPage />
            <div className="products-container">
                <h1>Product Information</h1>
                <Button type="primary" onClick={showModal}>Thêm Sản Phẩm</Button> {/* Nút để mở modal */}
                <Table
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    rowKey="productid"
                />
                <CreateProduct 
                    isModalVisible={isModalVisible} 
                    handleCancel={handleCancel} 
                    refreshData={refreshData} 
                />
            </div>
        </>
    );
};

export default ProductList;

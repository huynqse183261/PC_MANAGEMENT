import { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../api/services';

const UpdateProduct = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [imageName, setImageName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await apiService.getProductById(id);
                form.setFieldsValue({
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    description: product.description,
                    category: product.category,
                });
                setImageName(product.image); // Set the current image name
            } catch (error) {
                message.error("Error fetching product: " + error.message);
            }
        };

        fetchProduct();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            const updatedProduct = {
                ...values,
                image: imageName, // Only send the image name
            };
            await apiService.updateProduct(id, updatedProduct);
            message.success("Product updated successfully!");
            navigate(-1);
        } catch (error) {
            message.error("Error updating product: " + error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name); // Only store the image name
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="image" label="Image">
                <Input type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update Product
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;

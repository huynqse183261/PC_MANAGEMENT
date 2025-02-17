import { useState } from "react";
import { Form, Input, Button, InputNumber, message, Modal } from "antd";
import { apiService } from "../../api/services";
import PropTypes from "prop-types";

const CreateProduct = ({ isModalVisible, handleCancel, refreshData }) => {
  const [form] = Form.useForm();
  const [imageName, setImageName] = useState(""); // Chỉ lưu tên hình ảnh

  const onFinish = async (values) => {
    if (!imageName) {
      message.error("Please upload an image file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("description", values.description);

      // Chỉ gửi tên hình ảnh (không gửi tệp)
      formData.append("image", imageName);

      formData.append("category", values.category);

      await apiService.createProduct(formData); // Gửi FormData
      message.success("Product added successfully!");
      form.resetFields();
      setImageName(""); // Reset lại tên hình ảnh
      handleCancel();
      refreshData();
    } catch (error) {
      message.error(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error creating product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Lấy tên tệp mà không lấy đường dẫn đầy đủ
      setImageName(file.name);
    }
  };

  return (
    <Modal
      title="Add New Product"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter stock!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please enter category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateProduct.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default CreateProduct;

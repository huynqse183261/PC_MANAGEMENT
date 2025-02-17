import api from './axios';

export const apiService = {
    // Lấy danh sách
    getList: async () => {
        const response = await api.get('Product/GetAllProduct');
        return response.data;
    },

    // Đăng nhập
    login: async (data) => {
        const response = await api.post('Account/Login', data);
        return response.data;
    },

    getAllAccounts: async () => {
        const response = await api.get('Account/GetAllAccount');
        return response.data;
    },


    deleteAccount: async (id) => {
        const response = await api.delete(`Account/${id}`);
        return response.data;
    },

    updateAccountStatus: async (id, status) => {
        const response = await api.put(`Account/UpdateStatusById/${id}`, status);
        return response.data;
    },
    logoutAccount: async () => {
        const response = await api.post('Account/Logout');
        return response.data;
    },

    // Update the createProduct function
    createProduct: async (data) => {
        const response = await api.post('Product/CreateProduct', data); // Ensure this endpoint is correct
        return response.data;
    },

    updateProduct: async (id, data) => {
        const response = await api.put(`Product/UpdateProductById/${id}`, data);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await api.delete(`Product/${id}`);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`Product/${id}`); // Ensure this endpoint is correct
        return response.data;
    },
    // Thêm service đăng ký
    register: async (data) => {
        const response = await api.post('Account/CreateAccountUser', data);
        return response.data;
    },
}; 
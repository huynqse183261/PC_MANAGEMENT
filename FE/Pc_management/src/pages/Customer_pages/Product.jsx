import { useState, useEffect } from 'react';
import { apiService } from '../../api/services';
import '../styles/Product.css';
import Header from '../components/Header';

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiService.getList();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
        <Header />
        <div className="product-list">
            {products.map(product => (
                <div key={product.productid} className="product-card">
                    <img src={`/src/assets/images/${product.image}`} alt={product.name} className="product-image" />
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">{product.price.toLocaleString()} VND</p>
                    <p className="product-description">{product.description}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default Product;
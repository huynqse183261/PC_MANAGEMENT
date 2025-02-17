import "../styles/Home.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { apiService } from "../../api/services";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getList();
        console.log("Fetched products:", data); // Kiểm tra dữ liệu trả về
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="product-list">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.productid} className="product-card">
              <img
                src={`/src/assets/images/${product.image}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
            </div>
          ))
        ) : (
          <p>No products available</p> // Thêm thông báo khi không có sản phẩm
        )}
      </div>
    </>
  );
}

export default Home;

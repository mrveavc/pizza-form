import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useTheme } from "../components/Theme";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function ProductsPage() {
const [products, setProducts] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productCollection = await getDocs(collection(db, "products"));
    setProducts(productCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Ensure products is an empty array if fetch fails
      }
    };

    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={`products-page ${theme}`}>
      
      <Link className="add-product-button" to={"/addProduct"}>
        Pizza Oluştur
      </Link>
      <div className="products-list">
        {products && products.length === 0 ? (
            <p>Kullanıcını pizzası bulunamadı</p>):(
          products.map((product) => (
         
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <hr></hr>
              <p>Telefon: {product.phone}</p>
              <p>Kenar Tipi: {product.dough}</p>
              <p>
                İçindekiler:
                {product.toppings.map((topping) => topping.label).join(", ")}
              </p>
              <p>Extra Malzemeler: {product.extra}</p>
              <Link className="edit-button" to={`/productDetail/${product.id}`}>
                Düzenle
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Sil
              </button>
            </div>
          ))
        ) }
      </div>
    
    </div>
  );
}

export default ProductsPage;

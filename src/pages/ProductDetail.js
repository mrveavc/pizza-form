
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import options from "../options.json"; // options.json dosyasını içe aktar
import InputMask from "react-input-mask";

const ProductDetail = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { doughOptions, toppingOptions } = options;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "products", id);
        const docSnap = await getDoc(productDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setPhone(data.phone);
          setDough(data.dough);
          setToppings(data.toppings || []);
          setExtra(data.extra || '');
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name,
        phone,
        dough,
        toppings,
        extra,
      };
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, updatedProduct);
      navigate('/');
    } catch (error) {
      console.error("Error updating product:", error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="add-product-container">
      <form onSubmit={handleSave}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pizza İsmi"
          required
        />
       
      <InputMask
        mask="(999) 999-9999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="tel"
            required
            placeholder="Telefon Numarası"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
          />
        )}
      </InputMask>
        <select
          value={dough}
          onChange={(e) => setDough(e.target.value)}
          required
        >
          <option value="">Hamur Seçin</option>
          {doughOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <MultiSelect
          options={toppingOptions}
          value={toppings}
          onChange={setToppings}
          labelledBy="İçindekiler"
        />
        <input
          type="text"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Ekstra Malzemeler"
        />
        <button className="add-product-button" type="submit">
          Düzenlemeleri Kaydet
        </button>
      </form>
      <Link to={`/`} className="cancel-button">
        İptal
      </Link>
    </div>
  );
};

export default ProductDetail;
